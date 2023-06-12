const disallowCharacters = Array.from(": ")

export class ThemeType {
    hasDarkTheme: boolean = false
    id: string
    lightTheme: string
    darkTheme?: string
    lightActive: boolean = false
    darkActive: boolean = false
    basePath: string = "assets/development/styles/themes/"
    original: "light" | "dark" | false = false
    _lightId: string | null = null
    _darkId: string | null = null
    constructor(public label: string, lightTheme: string, darkTheme?: string, original?: "light" | "dark" | false) {
        let _id = ""
        Array.from(label).forEach((l) => {
            if (disallowCharacters.indexOf(l) === -1) {
                _id += l
            }
        })
        this.id = _id
        this.lightTheme = `${this.basePath}${lightTheme}`
        if (darkTheme) {
            this.darkTheme = `${this.basePath}${darkTheme}`
            this.hasDarkTheme = true
            this._darkId = this.darkId()
        }
        if (original) {
            this.original = original
        }
        this._lightId = this.lightId()
    }
    deactivateSelf() {
        if (this._lightId)
            this.deactivate(this._lightId)
        if (this._darkId) {
            this.deactivate(this._darkId)
        }
    }
    lightId() {
        return this.lightTheme ? `${this.id}_light` : null
    }
    darkId() {
        return this.darkTheme ? `${this.id}_dark` : null
    }
    deactivate(id: string) {
        if (typeof window === "undefined") return;
        let em = document.getElementById(id) as HTMLLinkElement
        if (!em) {
            return
        }
        em.media = 'none'
    }
    private activate(type: "dark" | "light") {
        if (typeof window === "undefined") return;
        const id = type === "dark" ? this._darkId : this._lightId
        console.log("Id", id)
        if (!id) return;
        const em = document.getElementById(id) as HTMLLinkElement
        if (!em) return
        em.media = ''
    }
    dark() {
        this.activate("dark")
        this.darkActive = true
    }
    light() {
        this.activate("light")
        this.lightActive = true
    }
    toggleDarkMode() {
        if (this.lightActive) {
            return this.dark()
        }
        if (this.darkActive) {
            this.light()
        }
    }
}

export const availableThemes: ThemeType[] = [
    new ThemeType("Arya Blue", "arya-blue/theme.css"),
    new ThemeType("Arya Green", "arya-green/theme.css"),
    new ThemeType("Arya Orange", "arya-orange/theme.css"),
    new ThemeType("Arya Purple", "arya-purple/theme.css"),
    new ThemeType("Bootstrap: Blue", "bootstrap4-light-blue/theme.css", "bootstrap4-dark-blue/theme.css"),
    new ThemeType("Bootstrap: Purple", "bootstrap4-light-purple/theme.css", "bootstrap4-dark-purple/theme.css"),
    new ThemeType("Fluent Light", "fluent-light/theme.css"),
    new ThemeType("Lara Blue", "lara-light-blue/theme.css", "lara-dark-blue/theme.css"),
    new ThemeType("Lara Indigo", "lara-light-indigo/theme.css", "lara-dark-indigo/theme.css"),
    new ThemeType("Lara Purple", "lara-light-purple/theme.css", "lara-dark-purple/theme.css"),
    new ThemeType("Lara Teal", "lara-light-teal/theme.css", "lara-dark-teal/theme.css"),
    new ThemeType("Luna Amber", "luna-amber/theme.css"),
    new ThemeType("Luna Blue", "luna-blue/theme.css"),
    new ThemeType("Luna Green", "luna-green/theme.css"),
    new ThemeType("Luna Pink", "luna-pink/theme.css"),
    new ThemeType("MD Deep Purple", "md-light-deeppurple/theme.css", "md-dark-deeppurple/theme.css"),
    new ThemeType("MD Indigo", "md-light-indigo/theme.css", "md-dark-indigo/theme.css"),
    new ThemeType("MDC Deep Purple", "mdc-light-deeppurple/theme.css", "mdc-dark-deeppurple/theme.css"),
    new ThemeType("MDC Indigo", "mdc-light-indigo/theme.css", "mdc-dark-indigo/theme.css"),
    new ThemeType("Mira", "mira/theme.css"),
    new ThemeType("Nano", "nano/theme.css"),
    new ThemeType("Nova", "nova/theme.css"),
    new ThemeType("Nova Accent", "nova-accent/theme.css"),
    new ThemeType("Nova Alt", "nova-alt/theme.css"),
    new ThemeType("Rhea", "rhea/theme.css"),
    new ThemeType("Saga Blue", "saga-blue/theme.css"),
    new ThemeType("Saga Green", "saga-green/theme.css"),
    new ThemeType("Saga Orange", "saga-orange/theme.css"),
    new ThemeType("Saga Purple", "saga-purple/theme.css"),
    new ThemeType("SOHO", "soho-light/theme.css", "soho-dark/theme.css", "light"),
    new ThemeType("Vela Blue", "vela-blue/theme.css"),
    new ThemeType("Vela Green", "vela-green/theme.css"),
    new ThemeType("Vela Orange", "vela-orange/theme.css"),
    new ThemeType("Vela Purple", "vela-purple/theme.css"),
    new ThemeType("Viva", "viva-light/theme.css", "viva-dark/theme.css"),
]
