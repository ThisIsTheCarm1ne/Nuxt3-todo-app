// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    modules: [
        ['@nuxtjs/google-fonts', {
            families: {
                Lato: [400],
            }
        }]
    ]
})