declare module 'virtual:astro-studio-cms:config' {
    const Config: import("./src/schemas").AstroStudioCMSOptions;
     export default Config;
}

declare module 'virtual:astro-studio-cms:layout' {
    export const VirtualLayout: import("./src/layouts/Virtual.astro");
}