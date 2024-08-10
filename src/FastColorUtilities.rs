use std::sync::Once;
use wasm_bindgen::prelude::*;

static INIT: Once = Once::new();
static mut GAMMA_CORRECTION_LOOKUP_TABLE: Option<[u8; 256]> = None;

impl FastColorUtilities {
    const BLUE_MASK: u32 = 255;
    const GREEN_MASK: u32 = 65280;
    const RED_MASK: u32 = 16711680;
    const ALPHA_MASK: u32 = 0xFF000000;
    const GAMMA_CORRECTION: f32 = 1.2;
}

#[wasm_bindgen]
pub struct FastColorUtilities;

#[wasm_bindgen]
impl FastColorUtilities {
    #[wasm_bindgen(getter,js_name = blueMask)]
    pub fn blue_mask() -> u32 {
        255
    }

    #[wasm_bindgen(getter, js_name = greenMask)]
    pub fn green_mask() -> u32 {
        65280
    }

    #[wasm_bindgen(getter,js_name = redMask)]
    pub fn red_mask() -> u32 {
        16711680
    }

    #[wasm_bindgen(getter,js_name = alphaMask)]
    pub fn alpha_mask() -> u32 {
        0xFF000000
    }

    #[wasm_bindgen(js_name = colorRGB)]
    pub fn color_rgb(red: u8, green: u8, blue: u8) -> u32 {
        ((red as u32) << 16) | ((green as u32) << 8) | (blue as u32)
    }

    #[wasm_bindgen(js_name = colorRGBA)]
    pub fn color_rgba(red: u8, green: u8, blue: u8, alpha: u8) -> u32 {
        ((alpha as u32) << 24) | ((red as u32) << 16) | ((green as u32) << 8) | (blue as u32)
    }

    #[wasm_bindgen(js_name = color)]
    pub fn color(red: u8, green: u8, blue: u8, alpha: Option<u8>) -> u32 {
        match alpha {
            Some(a) => Self::color_rgba(red, green, blue, a),
            None => Self::color_rgb(red, green, blue),
        }
    }

    fn initialize_gamma_correction_lookup_table() {
        INIT.call_once(|| {
            let mut table = [0u8; 256];
            for i in 0..256 {
                let value = ((i as f32 / 256.0).powf(0.8333333) * 256.0).round() as u8;
                table[i] = value;
            }
            unsafe {
                GAMMA_CORRECTION_LOOKUP_TABLE = Some(table);
            }
        });
    }

    #[wasm_bindgen(js_name = colorWithGammaAdjustment)]
    pub fn color_with_gamma_adjustment(red: u8, green: u8, blue: u8) -> u32 {
        Self::initialize_gamma_correction_lookup_table();
        let table = unsafe { GAMMA_CORRECTION_LOOKUP_TABLE.as_ref().unwrap() };
        ((table[red as usize] as u32) << 16) | 
        ((table[green as usize] as u32) << 8) | 
        (table[blue as usize] as u32)
    }

    #[wasm_bindgen(js_name = alpha)]
    pub fn alpha(color: u32) -> u8 {
        ((color & FastColorUtilities::ALPHA_MASK) >> 24) as u8
    }

    #[wasm_bindgen(js_name = red)]
    pub fn red(color: u32) -> u8 {
        ((color & FastColorUtilities::RED_MASK) >> 16) as u8
    }

    #[wasm_bindgen(js_name = green)]
    pub fn green(color: u32) -> u8 {
        ((color & FastColorUtilities::GREEN_MASK) >> 8) as u8
    }

    #[wasm_bindgen(js_name = blue)]
    pub fn blue(color: u32) -> u8 {
        (color & FastColorUtilities::BLUE_MASK) as u8
    }

    #[wasm_bindgen(js_name = getColorRGB)]
    pub fn get_color_rgb(color: u32) -> JsValue {
        let obj = js_sys::Object::new();
        js_sys::Reflect::set(&obj, &"red".into(), &JsValue::from(Self::red(color))).unwrap();
        js_sys::Reflect::set(&obj, &"green".into(), &JsValue::from(Self::green(color))).unwrap();
        js_sys::Reflect::set(&obj, &"blue".into(), &JsValue::from(Self::blue(color))).unwrap();
        js_sys::Reflect::set(&obj, &"alpha".into(), &JsValue::from(255u8)).unwrap();
        obj.into()
    }

    #[wasm_bindgen(js_name = getColorRGBA)]
    pub fn get_color_rgba(color: u32) -> JsValue {
        let obj = js_sys::Object::new();
        js_sys::Reflect::set(&obj, &"red".into(), &JsValue::from(Self::red(color))).unwrap();
        js_sys::Reflect::set(&obj, &"green".into(), &JsValue::from(Self::green(color))).unwrap();
        js_sys::Reflect::set(&obj, &"blue".into(), &JsValue::from(Self::blue(color))).unwrap();
        js_sys::Reflect::set(&obj, &"alpha".into(), &JsValue::from(Self::alpha(color))).unwrap();
        obj.into()
    }
}