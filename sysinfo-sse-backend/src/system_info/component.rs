use sysinfo::{Component as SysComponent, ComponentExt};

#[derive(serde::Serialize)]
pub struct Component {
    pub label: String,
    pub temperature: f32,
}

impl Component {
    pub fn new(component: &SysComponent) -> Self {
        Self {
            label: component.label().to_string(),
            temperature: component.temperature(),
        }
    }
}
