"""
Aura Auto Atelier / MAX COLOR - Automated Image Pre-Processing & Background Removal Pipeline
=============================================================================================
Production-grade Python pipeline for automotive landing page visual assets.

Features:
1. AI-Driven Vehicle Cutout & Alpha Matting (rembg with u2net / isnet-general-use / birefnet-general)
2. Alpha Edge-Blending, Defringing & Matte Feathering for seamless vehicle silhouette
3. Ground Shadow generation for realistic landing page depth
4. Luxury Automotive Color Toning & Grading (deep rich blacks, micro-contrast, metallic vibrance)
5. Modern WebP Encoding & Web Vitals Optimization (<200KB per card, <400KB for hero)
6. Structured Output Generation for src/assets/images/ with TypeScript index and JSON manifest
"""

import os
import sys
import json
import math
import argparse
import urllib.request
from pathlib import Path
from typing import Dict, Any, Tuple, Optional

import numpy as np
from PIL import Image, ImageFilter, ImageEnhance, ImageOps
import rembg

# ---------------------------------------------------------------------------
# Pipeline Configuration & Constants
# ---------------------------------------------------------------------------
DEFAULT_RAW_DIR = Path("raw_assets")
DEFAULT_OUTPUT_DIR = Path("src/assets/images")

# Curated High-Res Royalty-Free Automotive Sample URLs (for initial setup & testing)
CURATED_SOURCES = {
    "hero_vehicle": {
        "url": "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1920&q=85",
        "category": "hero",
        "filename": "hero_vehicle.webp",
        "max_size_kb": 400,
        "target_width": 1800,
        "description": "Hero Porsche GT3 / Hypercar with AI cutout & alpha matting"
    },
    "service_ppf": {
        "url": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=80",
        "category": "services",
        "filename": "service_ppf.webp",
        "max_size_kb": 200,
        "target_size": (1200, 800),
        "description": "Paint Protection Film (PPF / Clear Bra) installation"
    },
    "service_ceramic": {
        "url": "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1200&q=80",
        "category": "services",
        "filename": "service_ceramic.webp",
        "max_size_kb": 200,
        "target_size": (1200, 800),
        "description": "Ceramic & Graphene hydrophobic protective coating"
    },
    "service_wrap": {
        "url": "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1200&q=80",
        "category": "services",
        "filename": "service_wrap.webp",
        "max_size_kb": 200,
        "target_size": (1200, 800),
        "description": "Bespoke color change wrap and satin finish application"
    },
    "service_correction": {
        "url": "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1200&q=80",
        "category": "services",
        "filename": "service_paint_correction.webp",
        "max_size_kb": 200,
        "target_size": (1200, 800),
        "description": "Multi-stage machine paint correction and swirl removal"
    },
    "service_interior": {
        "url": "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
        "category": "services",
        "filename": "service_bespoke_interior.webp",
        "max_size_kb": 200,
        "target_size": (1200, 800),
        "description": "Bespoke interior leather, Alcantara & cabin detailing"
    },
    "service_tint": {
        "url": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
        "category": "services",
        "filename": "service_window_tint.webp",
        "max_size_kb": 200,
        "target_size": (1200, 800),
        "description": "Nano-ceramic heat & UV rejection window tinting"
    },
    "footer_showcase": {
        "url": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=85",
        "category": "footer",
        "filename": "footer_showcase.webp",
        "max_size_kb": 200,
        "target_size": (1920, 800),
        "description": "Ultra-wide luxury atelier studio workshop showcase"
    }
}


# ---------------------------------------------------------------------------
# Utility & Image Processing Core
# ---------------------------------------------------------------------------
def print_banner():
    print("=" * 76)
    print("  AURA AUTO ATELIER / MAX COLOR — ASSET PROCESSING PIPELINE")
    print("  AI Background Removal • Luxury Color Grading • WebP Optimization")
    print("=" * 76)


def ensure_raw_assets(raw_dir: Path) -> None:
    """Ensures raw source assets exist in raw_assets/ directory, downloading if needed."""
    raw_dir.mkdir(parents=True, exist_ok=True)
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AssetPipeline/1.0"}

    print(f"\n[*] Checking raw assets in '{raw_dir}'...")
    for key, spec in CURATED_SOURCES.items():
        ext = ".jpg"
        target_path = raw_dir / f"{key}{ext}"
        if not target_path.exists():
            print(f"  -> Downloading curated source for [{key}] from remote CDN...")
            try:
                req = urllib.request.Request(spec["url"], headers=headers)
                with urllib.request.urlopen(req, timeout=20) as resp, open(target_path, "wb") as f:
                    f.write(resp.read())
                print(f"     [OK] Saved {target_path.name} ({target_path.stat().st_size / 1024:.1f} KB)")
            except Exception as e:
                print(f"     [!] Remote fetch failed ({e}). Generating high-quality procedural source...")
                create_fallback_source(target_path, key, spec)
        else:
            print(f"  -> Found existing raw asset: {target_path.name}")


def create_fallback_source(target_path: Path, key: str, spec: Dict[str, Any]) -> None:
    """Generates a procedural high-res automotive studio gradient source if network is unavailable."""
    size = spec.get("target_size", (1600, 1000))
    img = Image.new("RGB", size, color=(15, 17, 23))
    # Create luxurious subtle radial studio lighting
    np_img = np.array(img, dtype=np.float32)
    h, w, _ = np_img.shape
    y, x = np.ogrid[:h, :w]
    cx, cy = w // 2, h // 2
    dist_from_center = np.sqrt((x - cx)**2 + (y - cy)**2)
    max_dist = np.sqrt(cx**2 + cy**2)
    radial = 1.0 - (dist_from_center / max_dist) * 0.7
    
    np_img[:, :, 0] = np.clip(18 * radial + 10, 0, 255)
    np_img[:, :, 1] = np.clip(22 * radial + 12, 0, 255)
    np_img[:, :, 2] = np.clip(28 * radial + 15, 0, 255)
    
    result = Image.fromarray(np_img.astype(np.uint8))
    result.save(target_path, "JPEG", quality=95)
    print(f"     [OK] Generated procedural asset: {target_path.name}")


def refine_alpha_edges(image_rgba: Image.Image, feather_radius: float = 1.2, erosion_iter: int = 1) -> Image.Image:
    """
    Applies professional alpha edge-blending and defringing to remove halo artifacts
    from vehicle cutouts.
    """
    if image_rgba.mode != "RGBA":
        image_rgba = image_rgba.convert("RGBA")

    r, g, b, a = image_rgba.split()
    
    # 1. Edge erosion on alpha channel to eliminate background halo bleeding
    eroded_alpha = a.filter(ImageFilter.MinFilter(3)) if erosion_iter > 0 else a
    
    # 2. Smooth edge transitions with slight Gaussian blur on boundary
    blurred_alpha = eroded_alpha.filter(ImageFilter.GaussianBlur(radius=feather_radius))
    
    # Merge back with refined alpha
    refined_image = Image.merge("RGBA", (r, g, b, blurred_alpha))
    return refined_image


def generate_contact_shadow(cutout_rgba: Image.Image, shadow_width_ratio: float = 0.95, shadow_height_ratio: float = 0.15) -> Image.Image:
    """
    Generates a realistic luxury automotive ambient contact ground shadow beneath the vehicle.
    """
    w, h = cutout_rgba.size
    shadow_w = int(w * shadow_width_ratio)
    shadow_h = int(h * shadow_height_ratio)
    
    shadow_canvas = Image.new("RGBA", (w, int(h * 0.35)), (0, 0, 0, 0))
    
    # Create soft radial elliptical shadow
    ellipse_arr = np.zeros((shadow_h, shadow_w, 4), dtype=np.uint8)
    
    y, x = np.ogrid[:shadow_h, :shadow_w]
    cx, cy = shadow_w / 2, shadow_h / 2
    # Normalized elliptical distance
    dist = ((x - cx) / (shadow_w / 2))**2 + ((y - cy) / (shadow_h / 2))**2
    
    # Multi-layer shadow density (tight contact core + soft ambient falloff)
    core_alpha = np.clip((1.0 - dist) * 200, 0, 180)
    ambient_alpha = np.clip((1.0 - np.sqrt(dist)) * 120, 0, 100)
    final_alpha = np.maximum(core_alpha, ambient_alpha) * (dist <= 1.0)
    
    ellipse_arr[:, :, 3] = final_alpha.astype(np.uint8)
    ellipse_layer = Image.fromarray(ellipse_arr, "RGBA")
    
    # Blur for realistic soft dispersion
    ellipse_layer = ellipse_layer.filter(ImageFilter.GaussianBlur(radius=max(1.0, shadow_h * 0.25)))
    
    # Paste centered horizontally at bottom
    pos_x = (w - shadow_w) // 2
    pos_y = (shadow_canvas.height - shadow_h) // 2
    shadow_canvas.paste(ellipse_layer, (pos_x, pos_y), ellipse_layer)
    return shadow_canvas


def apply_luxury_color_grading(img: Image.Image, is_footer: bool = False) -> Image.Image:
    """
    Applies bespoke high-end automotive atelier color grading:
    - Deep, rich obsidian blacks
    - Elevated metallic highlight clarity & micro-contrast
    - Refined satin saturation (avoids oversaturation, boosts rich hues)
    - Subtle cool studio shadow tint / neutral highlight preservation
    """
    # Work in RGB
    if img.mode != "RGB":
        img = img.convert("RGB")
    
    # 1. Micro-contrast enhancement (Unsharp Mask for paint & reflection crispness)
    img = img.filter(ImageFilter.UnsharpMask(radius=2.0, percent=130, threshold=3))
    
    # 2. Convert to NumPy for curve manipulation & color grading
    arr = np.array(img, dtype=np.float32) / 255.0
    
    # S-curve for deep blacks and punchy highlights
    contrast_strength = 0.35 if not is_footer else 0.45
    s_curve = 3 * (arr ** 2) - 2 * (arr ** 3)
    arr = (1 - contrast_strength) * arr + contrast_strength * s_curve
    
    # Color balance: Subtle studio cool-tint in shadows (cyan/blue) and warm/neutral metallic in highlights
    luminance = 0.299 * arr[:, :, 0] + 0.587 * arr[:, :, 1] + 0.114 * arr[:, :, 2]
    shadow_mask = np.clip(1.0 - (luminance * 2.0), 0, 1)[:, :, np.newaxis]
    
    # Apply subtle atelier dark tint
    arr[:, :, 2] += shadow_mask[:, :, 0] * 0.02  # Blue shadow boost
    arr[:, :, 0] += shadow_mask[:, :, 0] * 0.005 # Slight magenta counter
    
    # Vignette for footer atmosphere
    if is_footer:
        h, w, _ = arr.shape
        y, x = np.ogrid[:h, :w]
        cx, cy = w / 2, h / 2
        dist = np.sqrt(((x - cx) / (w / 2)) ** 2 + ((y - cy) / (h / 2)) ** 2)
        vignette = np.clip(1.0 - (dist ** 2) * 0.4, 0.4, 1.0)[:, :, np.newaxis]
        arr *= vignette
        
    arr = np.clip(arr * 255.0, 0, 255).astype(np.uint8)
    graded_img = Image.fromarray(arr, "RGB")
    
    # 3. Refine Saturation & Vibrance with PIL ImageEnhance
    enhancer_sat = ImageEnhance.Color(graded_img)
    graded_img = enhancer_sat.enhance(1.08 if not is_footer else 1.02)
    
    enhancer_sharp = ImageEnhance.Sharpness(graded_img)
    graded_img = enhancer_sharp.enhance(1.15)
    
    return graded_img


def optimize_save_webp(
    img: Image.Image,
    target_path: Path,
    max_size_kb: int,
    is_hero_cutout: bool = False
) -> Dict[str, Any]:
    """
    Saves image in optimized modern WebP format, iterating quality if needed to
    strictly respect Web Vitals budget (<200KB for cards, <400KB for hero).
    """
    target_path.parent.mkdir(parents=True, exist_ok=True)
    
    has_alpha = (img.mode == "RGBA")
    initial_quality = 90 if (is_hero_cutout and has_alpha) else 85
    method = 6

    quality = initial_quality
    current_img = img
    
    while True:
        current_img.save(
            target_path,
            "WEBP",
            quality=quality,
            method=method,
            lossless=False
        )
        file_size_kb = target_path.stat().st_size / 1024.0
        if file_size_kb <= max_size_kb:
            break
            
        if quality > 45:
            quality -= 5
        elif current_img.width > 800:
            # Subtle scaling if image is still above budget at quality 45
            new_w = int(current_img.width * 0.9)
            new_h = int(current_img.height * 0.9)
            current_img = current_img.resize((new_w, new_h), Image.Resampling.LANCZOS)
            quality = 75
        else:
            quality -= 5
            if quality <= 20:
                break

    final_size_kb = target_path.stat().st_size / 1024.0
    status = "[PASS]" if final_size_kb <= max_size_kb else "[WARN]"
    
    return {
        "path": str(target_path),
        "size_kb": round(final_size_kb, 2),
        "target_max_kb": max_size_kb,
        "width": current_img.width,
        "height": current_img.height,
        "quality": quality,
        "has_alpha": has_alpha,
        "status": status
    }


def crop_and_resize_card(img: Image.Image, target_size: Tuple[int, int]) -> Image.Image:
    """Smart-crops and resizes image to exact target dimensions with high-quality Lanczos resampling."""
    return ImageOps.fit(img, target_size, method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))


# ---------------------------------------------------------------------------
# Pipeline Execution Functions
# ---------------------------------------------------------------------------
def process_hero_vehicle(
    raw_path: Path,
    output_dir: Path,
    model_name: str = "u2net"
) -> Dict[str, Any]:
    """
    Executes AI background removal with rembg, alpha edge defringing,
    ground shadow synthesis, and WebP compression.
    """
    print(f"\n[*] Processing Hero Vehicle Cutout with AI model [{model_name}]...")
    print(f"    Source: {raw_path}")
    
    raw_img = Image.open(raw_path)
    
    # 1. Run rembg background removal session
    print("    -> Initializing rembg AI background removal session...")
    try:
        session = rembg.new_session(model_name)
        cutout = rembg.remove(
            raw_img,
            session=session,
            post_process_mask=True
        )
    except Exception as e:
        print(f"    [!] Rembg session fallback ({e}), attempting standard remove...")
        cutout = rembg.remove(raw_img, post_process_mask=True)
    
    # 2. Alpha edge refinement & defringing
    print("    -> Applying alpha edge refinement and matte defringing...")
    cutout = refine_alpha_edges(cutout, feather_radius=0.6, erosion_iter=0)
    
    # 3. Crop transparent boundaries while maintaining clean vehicle aspect
    bbox = cutout.getbbox()
    if bbox:
        # Add 3% margin around vehicle
        margin_x = int((bbox[2] - bbox[0]) * 0.03)
        margin_y = int((bbox[3] - bbox[1]) * 0.03)
        crop_box = (
            max(0, bbox[0] - margin_x),
            max(0, bbox[1] - margin_y),
            min(cutout.width, bbox[2] + margin_x),
            min(cutout.height, bbox[3] + margin_y)
        )
        cutout = cutout.crop(crop_box)
        
    # Resize to standardized hero resolution
    target_width = CURATED_SOURCES["hero_vehicle"]["target_width"]
    if cutout.width > target_width:
        ratio = target_width / cutout.width
        cutout = cutout.resize((target_width, int(cutout.height * ratio)), Image.Resampling.LANCZOS)
    
    # 4. Generate ambient contact shadow
    print("    -> Synthesizing contact ground shadow layer...")
    shadow_img = generate_contact_shadow(cutout)
    
    # 5. Save Hero Vehicle Cutout & Shadow
    hero_out_path = output_dir / "hero" / "hero_vehicle.webp"
    shadow_out_path = output_dir / "hero" / "hero_vehicle_shadow.webp"
    
    res_hero = optimize_save_webp(
        cutout,
        hero_out_path,
        max_size_kb=CURATED_SOURCES["hero_vehicle"]["max_size_kb"],
        is_hero_cutout=True
    )
    
    res_shadow = optimize_save_webp(
        shadow_img,
        shadow_out_path,
        max_size_kb=100,
        is_hero_cutout=True
    )
    
    print(f"    [OK] Hero cutout saved: {hero_out_path} ({res_hero['size_kb']} KB, {res_hero['width']}x{res_hero['height']}px)")
    print(f"    [OK] Hero shadow saved: {shadow_out_path} ({res_shadow['size_kb']} KB)")
    
    return {
        "hero_vehicle": res_hero,
        "hero_shadow": res_shadow
    }


def process_service_cards(raw_dir: Path, output_dir: Path) -> Dict[str, Any]:
    """Processes, smart-crops, color-tones, and compresses all luxury service card images."""
    print("\n[*] Processing Service Cards...")
    results = {}
    
    for key, spec in CURATED_SOURCES.items():
        if spec["category"] != "services":
            continue
            
        raw_path = raw_dir / f"{key}.jpg"
        if not raw_path.exists():
            raw_path = raw_dir / f"{key}.png"
            
        if not raw_path.exists():
            print(f"    [!] Skipping {key}: raw file not found at {raw_path}")
            continue
            
        print(f"    -> Formatting & Color-Grading [{key}]: {spec['description']}")
        img = Image.open(raw_path)
        
        # 1. Smart-crop to 1200x800 (3:2 luxury ratio)
        target_size = spec.get("target_size", (1200, 800))
        fitted_img = crop_and_resize_card(img, target_size)
        
        # 2. Color-grading
        graded_img = apply_luxury_color_grading(fitted_img, is_footer=False)
        
        # 3. WebP optimize
        target_path = output_dir / "services" / spec["filename"]
        res = optimize_save_webp(
            graded_img,
            target_path,
            max_size_kb=spec["max_size_kb"],
            is_hero_cutout=False
        )
        
        results[key] = res
        print(f"       {res['status']} {target_path.name}: {res['size_kb']} KB (Budget: {spec['max_size_kb']} KB, {res['width']}x{res['height']}px)")
        
    return results


def process_footer_showcase(raw_dir: Path, output_dir: Path) -> Dict[str, Any]:
    """Formats, tones, and optimizes the ultra-wide footer showcase atmosphere image."""
    print("\n[*] Processing Footer Showcase Image...")
    spec = CURATED_SOURCES["footer_showcase"]
    raw_path = raw_dir / "footer_showcase.jpg"
    if not raw_path.exists():
        raw_path = raw_dir / "footer_showcase.png"
        
    if not raw_path.exists():
        print("    [!] Footer showcase raw file not found.")
        return {}
        
    img = Image.open(raw_path)
    target_size = spec.get("target_size", (1920, 800))
    fitted_img = crop_and_resize_card(img, target_size)
    
    # Apply cinematic atelier toning with vignette
    graded_img = apply_luxury_color_grading(fitted_img, is_footer=True)
    
    target_path = output_dir / "footer" / spec["filename"]
    res = optimize_save_webp(
        graded_img,
        target_path,
        max_size_kb=spec["max_size_kb"],
        is_hero_cutout=False
    )
    
    print(f"    {res['status']} {target_path.name}: {res['size_kb']} KB (Budget: {spec['max_size_kb']} KB, {res['width']}x{res['height']}px)")
    return {"footer_showcase": res}


def generate_manifest_and_ts_index(output_dir: Path, metrics: Dict[str, Any]) -> None:
    """Generates manifest.json and a TypeScript image index module for frontend consumption."""
    print("\n[*] Generating asset manifest and TypeScript exports...")
    
    # 1. JSON Manifest
    manifest_path = output_dir / "manifest.json"
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(metrics, f, indent=2)
    print(f"    [OK] Saved manifest: {manifest_path}")
    
    # 2. TypeScript Module Index
    ts_code = """// Auto-generated by Aura Auto Atelier Image Processing Pipeline
// DO NOT EDIT DIRECTLY

export interface AssetImageMeta {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizeKb: number;
}

// Hero Vehicle Assets
import heroVehicleCutout from './hero/hero_vehicle.webp';
import heroVehicleShadow from './hero/hero_vehicle_shadow.webp';

// Service Cards Assets
import servicePPF from './services/service_ppf.webp';
import serviceCeramic from './services/service_ceramic.webp';
import serviceWrap from './services/service_wrap.webp';
import servicePaintCorrection from './services/service_paint_correction.webp';
import serviceBespokeInterior from './services/service_bespoke_interior.webp';
import serviceWindowTint from './services/service_window_tint.webp';

// Footer Atmosphere Asset
import footerShowcase from './footer/footer_showcase.webp';

export const HERO_ASSETS = {
  cutout: heroVehicleCutout,
  shadow: heroVehicleShadow,
};

export const SERVICE_ASSETS = {
  ppf: {
    src: servicePPF,
    title: 'Paint Protection Film (PPF)',
    description: 'Self-healing, optically clear urethane shield protecting against stone chips, scratches, and road debris.',
  },
  ceramic: {
    src: serviceCeramic,
    title: 'Ceramic & Graphene Coating',
    description: 'Molecular nanoceramic bond delivering unmatched hydrophobicity, UV resistance, and mirror-like gloss.',
  },
  wrap: {
    src: serviceWrap,
    title: 'Bespoke Color Change Wrap',
    description: 'Premium vinyl & satin transformations executed with flawless panel disassembly and edge tucking.',
  },
  correction: {
    src: servicePaintCorrection,
    title: 'Multi-Stage Paint Correction',
    description: 'Precision jewel-polishing eliminating swirl marks, oxidation, and micro-marring to reveal deep luster.',
  },
  interior: {
    src: serviceBespokeInterior,
    title: 'Bespoke Interior Atelier',
    description: 'Leather conditioning, Alcantara revitalizing, and hydrophobic cabin surface shielding.',
  },
  tint: {
    src: serviceWindowTint,
    title: 'Nano-Ceramic Window Tint',
    description: 'Maximum infrared heat and UV rejection with crystal clear optical clarity and privacy.',
  },
};

export const FOOTER_ASSETS = {
  showcase: footerShowcase,
};

export default {
  hero: HERO_ASSETS,
  services: SERVICE_ASSETS,
  footer: FOOTER_ASSETS,
};
"""
    ts_path = output_dir / "index.ts"
    with open(ts_path, "w", encoding="utf-8") as f:
        f.write(ts_code)
    print(f"    [OK] Saved TypeScript module: {ts_path}")


# ---------------------------------------------------------------------------
# CLI Entry Point
# ---------------------------------------------------------------------------
def main():
    parser = argparse.ArgumentParser(description="Aura Auto Atelier Image Processing & AI Cutout Pipeline")
    parser.add_argument("--raw-dir", type=Path, default=DEFAULT_RAW_DIR, help="Directory containing raw image assets")
    parser.add_argument("--output-dir", type=Path, default=DEFAULT_OUTPUT_DIR, help="Destination directory for processed WebP assets")
    parser.add_argument("--model", type=str, default="u2net", choices=["u2net", "isnet-general-use", "birefnet-general"], help="AI segmentation model for background removal")
    parser.add_argument("--force-download", action="store_true", help="Force re-downloading curated sample assets")
    
    args = parser.parse_args()
    
    print_banner()
    
    # 1. Verify & Fetch Raw Assets
    ensure_raw_assets(args.raw_dir)
    
    # 2. Process Assets
    all_metrics: Dict[str, Any] = {
        "pipeline_version": "1.0.0",
        "model_used": args.model,
        "assets": {}
    }
    
    hero_raw = args.raw_dir / "hero_vehicle.jpg"
    if not hero_raw.exists():
        hero_raw = args.raw_dir / "hero_vehicle.png"
        
    if hero_raw.exists():
        hero_results = process_hero_vehicle(hero_raw, args.output_dir, model_name=args.model)
        all_metrics["assets"].update(hero_results)
        
    service_results = process_service_cards(args.raw_dir, args.output_dir)
    all_metrics["assets"].update(service_results)
    
    footer_results = process_footer_showcase(args.raw_dir, args.output_dir)
    all_metrics["assets"].update(footer_results)
    
    # 3. Generate Manifest and TypeScript Index
    generate_manifest_and_ts_index(args.output_dir, all_metrics)
    
    # Summary Table
    print("\n" + "=" * 76)
    print("  IMAGE PIPELINE COMPLETED SUCCESSFULLY")
    print("=" * 76)
    total_kb = 0.0
    for name, data in all_metrics["assets"].items():
        size = data.get("size_kb", 0)
        total_kb += size
        w = data.get("width", 0)
        h = data.get("height", 0)
        limit = data.get("target_max_kb", 0)
        print(f"  • {name:<26} : {size:>6.1f} KB / limit {limit} KB [{w}x{h}px] -> {data.get('status', 'OK')}")
    
    print("-" * 76)
    print(f"  Total Bundle Asset Size: {total_kb:.1f} KB across {len(all_metrics['assets'])} optimized assets")
    print(f"  Destination: {args.output_dir.resolve()}")
    print("=" * 76 + "\n")


if __name__ == "__main__":
    main()
