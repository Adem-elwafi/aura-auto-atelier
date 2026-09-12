import os
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter, ImageDraw

TW, TH = 1376, 768
Y_CONTACT = 581

def create_feather_mask(w, h, top_y=540, start_y=582, bot_y1=710, bot_y2=768, side_w=140):
    y = np.arange(h)[:, None]
    x = np.arange(w)[None, :]
    
    # Vertical fade
    v_top = np.clip((y - top_y) / float(start_y - top_y), 0, 1)
    v_top = 0.5 - 0.5 * np.cos(v_top * np.pi)
    
    v_bot = np.clip((bot_y2 - y) / float(bot_y2 - bot_y1), 0, 1)
    v_bot = 0.5 - 0.5 * np.cos(v_bot * np.pi)
    
    v_mask = v_top * v_bot
    
    # Horizontal fade
    h_left = np.clip(x / float(side_w), 0, 1)
    h_left = 0.5 - 0.5 * np.cos(h_left * np.pi)
    
    h_right = np.clip((w - x) / float(side_w), 0, 1)
    h_right = 0.5 - 0.5 * np.cos(h_right * np.pi)
    
    h_mask = h_left * h_right
    
    return (v_mask * h_mask).astype(float)


def generate_finished_environment():
    env = Image.new('RGBA', (TW, TH), (0, 0, 0, 0))
    
    # 1. Base deep cobalt / midnight illumination pool
    base_pool = Image.new('RGBA', (TW, TH), (0, 0, 0, 0))
    draw_base = ImageDraw.Draw(base_pool)
    draw_base.ellipse([80, 540, 1296, 780], fill=(20, 50, 120, 140))
    draw_base.ellipse([220, 560, 1150, 750], fill=(30, 80, 180, 120))
    base_pool = base_pool.filter(ImageFilter.GaussianBlur(radius=35))
    env = Image.alpha_composite(env, base_pool)
    
    # 2. Horizontal neon specular streaks
    streaks_layer = Image.new('RGBA', (TW // 2, TH), (0, 0, 0, 0))
    draw_s = ImageDraw.Draw(streaks_layer)
    
    specs = [
        (160, 610, 140, 14, (56, 189, 248, 180)),
        (280, 635, 200, 16, (6, 182, 212, 210)),
        (420, 645, 220, 18, (37, 99, 235, 220)),
        (540, 620, 160, 14, (56, 189, 248, 190)),
        (350, 665, 260, 20, (14, 165, 233, 170)),
        (480, 675, 180, 16, (59, 130, 246, 160)),
        (90, 645, 120, 18, (168, 85, 247, 140)),
        (600, 650, 130, 18, (236, 72, 153, 130)),
        (240, 595, 110, 8, (125, 211, 252, 190)),
        (460, 600, 130, 8, (147, 197, 253, 190)),
    ]
    
    for cx, cy, w, h, col in specs:
        draw_s.ellipse([cx - w // 2, cy - h // 2, cx + w // 2, cy + h // 2], fill=col)
        
    streaks_layer = streaks_layer.filter(ImageFilter.GaussianBlur(radius=8))
    streaks_stretched = streaks_layer.resize((TW, TH), Image.Resampling.BICUBIC)
    streaks_stretched = streaks_stretched.filter(ImageFilter.GaussianBlur(radius=4))
    
    env = Image.alpha_composite(env, streaks_stretched)
    
    # 3. Apply smooth 2D boundary feather mask
    mask = create_feather_mask(TW, TH, top_y=540, start_y=582, bot_y1=710, bot_y2=768, side_w=140)
    arr = np.array(env).astype(float)
    arr[:, :, 3] = arr[:, :, 3] * mask
    
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), 'RGBA')


def generate_raw_environment():
    env = Image.new('RGBA', (TW, TH), (0, 0, 0, 0))
    
    # 1. Base cool industrial slate / epoxy floor wash
    base_pool = Image.new('RGBA', (TW, TH), (0, 0, 0, 0))
    draw_base = ImageDraw.Draw(base_pool)
    draw_base.ellipse([100, 545, 1276, 780], fill=(22, 30, 44, 150))
    draw_base.ellipse([260, 565, 1110, 750], fill=(30, 41, 59, 130))
    base_pool = base_pool.filter(ImageFilter.GaussianBlur(radius=30))
    env = Image.alpha_composite(env, base_pool)
    
    # 2. Studio overhead tube/strip lights reflection
    strips_layer = Image.new('RGBA', (TW // 2, TH), (0, 0, 0, 0))
    draw_st = ImageDraw.Draw(strips_layer)
    
    specs = [
        (180, 620, 160, 20, (190, 205, 225, 110)),
        (360, 635, 240, 24, (210, 225, 245, 130)),
        (520, 625, 180, 22, (185, 200, 220, 110)),
        (260, 660, 220, 20, (148, 163, 184, 90)),
        (450, 670, 240, 22, (148, 163, 184, 90)),
        (350, 600, 120, 10, (226, 232, 240, 120)),
    ]
    
    for cx, cy, w, h, col in specs:
        draw_st.ellipse([cx - w // 2, cy - h // 2, cx + w // 2, cy + h // 2], fill=col)
        
    strips_layer = strips_layer.filter(ImageFilter.GaussianBlur(radius=10))
    strips_stretched = strips_layer.resize((TW, TH), Image.Resampling.BICUBIC)
    strips_stretched = strips_stretched.filter(ImageFilter.GaussianBlur(radius=5))
    
    env = Image.alpha_composite(env, strips_stretched)
    
    # 3. Apply smooth boundary feather
    mask = create_feather_mask(TW, TH, top_y=540, start_y=582, bot_y1=705, bot_y2=768, side_w=140)
    arr = np.array(env).astype(float)
    arr[:, :, 3] = arr[:, :, 3] * mask
    
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), 'RGBA')


def generate_car_reflection(cutout_path: Path, base_opacity: float = 0.70, blur_curve: float = 5.5):
    cutout = Image.open(cutout_path).convert('RGBA')
    
    # Crop the vehicle above contact line
    car_part = cutout.crop((0, 0, TW, Y_CONTACT))
    flipped = car_part.transpose(Image.FLIP_TOP_BOTTOM)
    
    # Create reflected canvas
    refl_canvas = Image.new('RGBA', (TW, TH), (0, 0, 0, 0))
    refl_canvas.paste(flipped, (0, Y_CONTACT))
    
    # Progressive specular blur: 3 stages (sharp, medium, soft)
    blur_sharp = refl_canvas.filter(ImageFilter.GaussianBlur(radius=1.2))
    blur_med = refl_canvas.filter(ImageFilter.GaussianBlur(radius=3.2))
    blur_soft = refl_canvas.filter(ImageFilter.GaussianBlur(radius=blur_curve))
    
    arr_sharp = np.array(blur_sharp).astype(float)
    arr_med = np.array(blur_med).astype(float)
    arr_soft = np.array(blur_soft).astype(float)
    
    # Distance from contact line (581 to 768)
    y_indices = np.arange(TH)
    dist = np.clip((y_indices - Y_CONTACT) / float(TH - Y_CONTACT), 0, 1)[:, None, None]
    
    # Weighted multi-stage specular blend
    w_sharp = np.clip(1.0 - dist * 2.2, 0, 1)
    w_med = np.clip(1.0 - np.abs(dist - 0.4) * 2.2, 0, 1)
    w_soft = np.clip((dist - 0.35) * 2.0, 0, 1)
    total_w = w_sharp + w_med + w_soft + 1e-6
    
    blended = (arr_sharp * w_sharp + arr_med * w_med + arr_soft * w_soft) / total_w
    
    # Downward falloff: highest at tire contact, smoothly fading downwards
    falloff = np.clip(1.0 - (dist[:, :, 0] ** 0.88), 0, 1) * base_opacity
    
    # Soft 2px feather right at the contact line to perfectly marry with the contact shadow
    top_feather = np.clip((y_indices - (Y_CONTACT - 1)) / 3.0, 0, 1)[:, None]
    
    blended[:, :, 3] = blended[:, :, 3] * falloff * top_feather
    
    return Image.fromarray(np.clip(blended, 0, 255).astype(np.uint8), 'RGBA')


def main():
    hero_dir = Path('src/assets/images/hero')
    raw_cutout_path = hero_dir / 'hero_gtr_raw_cutout.webp'
    finished_cutout_path = hero_dir / 'hero_gtr_finished_cutout.webp'
    
    print('[*] Generating Wide Atmosphere Environments...')
    finished_env = generate_finished_environment()
    raw_env = generate_raw_environment()
    
    print('[*] Generating Pixel-Perfect Car Reflections (scaleY(-1) at y=581)...')
    refl_finished_car = generate_car_reflection(finished_cutout_path, base_opacity=0.72, blur_curve=6.0)
    refl_raw_car = generate_car_reflection(raw_cutout_path, base_opacity=0.60, blur_curve=5.0)
    
    print('[*] Compositing Final Floor Reflections...')
    final_finished = Image.alpha_composite(finished_env, refl_finished_car)
    final_raw = Image.alpha_composite(raw_env, refl_raw_car)
    
    out_finished = hero_dir / 'hero_reflection_finished.webp'
    out_raw = hero_dir / 'hero_reflection_raw.webp'
    
    final_finished.save(out_finished, 'WEBP', quality=90, method=6)
    final_raw.save(out_raw, 'WEBP', quality=90, method=6)
    
    print(f'[OK] Saved {out_finished} ({out_finished.stat().st_size / 1024:.1f} KB)')
    print(f'[OK] Saved {out_raw} ({out_raw.stat().st_size / 1024:.1f} KB)')
    
    for name, p in [('Finished', out_finished), ('Raw', out_raw)]:
        img = Image.open(p)
        bbox = img.getbbox()
        arr = np.array(img)
        print(f'  * {name} Reflection: size={img.size}, bbox={bbox}, max_alpha={arr[:,:,3].max()}')

if __name__ == '__main__':
    main()
