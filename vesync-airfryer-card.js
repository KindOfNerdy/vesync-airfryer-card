/*
 * VeSync Air Fryer Card
 * Control card for dual-basket VeSync air fryers (entities of the vesync integration).
 * Colors and fonts come only from the Home Assistant theme.
 */

const CARD_VERSION = "0.5.2";

const TEXT = {
  en: {
    ready_hint: "Press the start key on the appliance",
    panel_hint: "Chosen on the appliance – start or cancel it there",
    basket: "Basket {n}",
    top: "top",
    bottom: "bottom",
    done_at: "done at",
    left: "{n} min left",
    start: "Start",
    send: "Send",
    pause: "Pause",
    resume: "Resume",
    stop: "Stop",
    confirm_stop: "Stop?",
    both: "Both baskets",
    start_both: "Start both",
    send_both: "Send both",
    pause_all: "Pause all",
    resume_all: "Resume all",
    stop_all: "Stop all",
    leave_sync: "Leave Sync",
    settings: "Settings",
    action_button: "Action button",
    action_hint: "Start cooking right away or only send the values to the appliance",
    recipes: "Recipes",
    no_recipes: "No recipes found. Give your recipe scripts the label “Airfryer-Rezept” (ID airfryer_rezept).",
    ed_mode: "Variant",
    ed_mode_full: "Full (controls and recipes)",
    ed_mode_control: "Controls only",
    ed_mode_recipes: "Recipes only",
    ed_hide: "Hide sections",
    ed_hide_header: "Header",
    ed_hide_both: "Both baskets",
    ed_hide_settings: "Settings",
    ed_hide_form: "Program, temperature and time",
    ed_name: "Title",
    ed_h_name: "Replaces the device name in the header",
    ed_device_id: "Air fryer",
    ed_h_device_id: "Leave empty if you have only one VeSync air fryer",
    ed_direct_start_entity: "Start-now helper",
    ed_h_direct_start_entity: "Optional input_boolean that recipe scripts share; without it the browser remembers the choice",
    ed_confirm_stop: "Ask before stopping",
    ed_h_confirm_stop: "Tap Stop twice: the first tap asks, the second stops",
    ed_basket_entity: "Recipe basket helper",
    ed_h_basket_entity: "input_select for recipes whose basket is “from helper”",
    ed_recipe_label: "Recipe label",
    ed_h_recipe_label: "Scripts with one of these labels are shown as recipes (default: airfryer_rezept)",
    ed_recipe_filter: "Extra name filter",
    ed_h_recipe_filter: "Optional, for example script.turbo_tower_*",
    ed_images: "Pictures (optional)",
    ed_device: "Device picture",
    ed_basket: "Basket picture ({n} = 1 or 2)",
    ed_basket_out: "Picture with the basket pulled out",
    recipes_soon: "Recipes are not part of this version yet.",
    no_device: "No VeSync air fryer found. Set device_id in the card configuration.",
  },
  de: {
    ready_hint: "Start-Taste am Gerät drücken",
    panel_hint: "Am Gerät gewählt – dort starten oder abbrechen",
    basket: "Korb {n}",
    top: "oben",
    bottom: "unten",
    done_at: "fertig um",
    left: "noch {n} min",
    start: "Starten",
    send: "Senden",
    pause: "Pausieren",
    resume: "Fortsetzen",
    stop: "Stoppen",
    confirm_stop: "Stoppen?",
    both: "Beide Körbe",
    start_both: "Beide starten",
    send_both: "Beide senden",
    pause_all: "Alle pausieren",
    resume_all: "Alle fortsetzen",
    stop_all: "Alle stoppen",
    leave_sync: "Sync beenden",
    settings: "Einstellungen",
    action_button: "Aktionsknopf",
    action_hint: "Sofort starten oder die Werte nur an das Gerät senden",
    recipes: "Rezepte",
    no_recipes: "Keine Rezepte gefunden. Rezept-Skripten das Label „Airfryer-Rezept“ geben (ID airfryer_rezept).",
    ed_mode: "Variante",
    ed_mode_full: "Komplett (Steuerung und Rezepte)",
    ed_mode_control: "Nur Steuerung",
    ed_mode_recipes: "Nur Rezepte",
    ed_hide: "Abschnitte ausblenden",
    ed_hide_header: "Kopf",
    ed_hide_both: "Beide Körbe",
    ed_hide_settings: "Einstellungen",
    ed_hide_form: "Programm, Temperatur und Zeit",
    ed_name: "Titel",
    ed_h_name: "Ersetzt den Gerätenamen im Kopf",
    ed_device_id: "Airfryer",
    ed_h_device_id: "Leer lassen, wenn du nur einen VeSync-Airfryer hast",
    ed_direct_start_entity: "Helfer „Sofort starten“",
    ed_h_direct_start_entity: "Optionaler input_boolean, den auch die Rezept-Skripte nutzen; ohne Helfer merkt sich der Browser die Wahl",
    ed_confirm_stop: "Vor dem Stoppen nachfragen",
    ed_h_confirm_stop: "Zweimal tippen: der erste Tipp fragt nach, der zweite stoppt",
    ed_basket_entity: "Helfer Rezept-Korb",
    ed_h_basket_entity: "input_select für Rezepte, deren Korb „aus Helfer“ kommt",
    ed_recipe_label: "Rezept-Label",
    ed_h_recipe_label: "Skripte mit einem dieser Labels erscheinen als Rezepte (Standard: airfryer_rezept)",
    ed_recipe_filter: "Zusätzlicher Namensfilter",
    ed_h_recipe_filter: "Optional, zum Beispiel script.turbo_tower_*",
    ed_images: "Bilder (optional)",
    ed_device: "Bild des Geräts",
    ed_basket: "Bild eines Korbs ({n} = 1 oder 2)",
    ed_basket_out: "Bild mit herausgezogenem Korb",
    recipes_soon: "Rezepte sind in dieser Version noch nicht enthalten.",
    no_device: "Kein VeSync-Airfryer gefunden. device_id in der Kartenkonfiguration setzen.",
  },
};

// Editor texts: the form is described before the card knows the user's language, so the
// language of the page is used (Home Assistant sets it on <html>).
function uiText(key) {
  const lang = (document.documentElement.lang || "en").split("-")[0];
  return (TEXT[lang] || TEXT.en)[key] || TEXT.en[key] || key;
}

const EMPTY = ["unknown", "unavailable", "none", "", "0"];

// Cook status -> theme color variable
const STATUS_COLOR = {
  cooking: "var(--state-climate-heat-color, var(--orange-color))",
  heating: "var(--state-climate-heat-color, var(--orange-color))",
  cooking_stop: "var(--warning-color)",
  preheat_stop: "var(--warning-color)",
  pull_out: "var(--warning-color)",
  hold: "var(--info-color)",
  ready: "var(--success-color)",
  cooking_end: "var(--success-color)",
};

const ACTIVE = ["cooking", "heating", "hold"];
const PAUSED = ["cooking_stop", "preheat_stop"];
const STOPPABLE = ["ready", "cooking_end", ...ACTIVE, ...PAUSED];

class VesyncAirfryerCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._sig = null;
    this._lastStates = null;
    this._busy = new Set();
    this._pending = {};
    this._timers = {};
    this._confirm = null;
    this._message = "";
    this._bothOpen = false;
    this._settingsOpen = false;
    this._recipesOpen = false;
    this._recipeCfg = {};
    this._recipeList = [];
    this._recipeSrc = null;

    this.shadowRoot.addEventListener("click", (e) => {
      const el = e.target.closest("[data-act]");
      if (!el || el.disabled) return;
      const entity = el.dataset.entity;
      if (el.dataset.act === "press") this._press(entity, el.dataset.confirm === "1");
      if (el.dataset.act === "step") this._step(entity, Number(el.dataset.dir));
      if (el.dataset.act === "toggle") {
        this._bothOpen = !this._bothOpen;
        this._refresh();
      }
      if (el.dataset.act === "recipe") this._runRecipe(entity);
      if (el.dataset.act === "basket-opt") {
        this._hass
          .callService("input_select", "select_option", {
            entity_id: this._config.basket_entity,
            option: el.dataset.value,
          })
          .catch((err) => this._error(err));
      }
      if (el.dataset.act === "toggle-recipes") {
        this._recipesOpen = !this._recipesOpen;
        this._refresh();
      }
      if (el.dataset.act === "toggle-settings") {
        this._settingsOpen = !this._settingsOpen;
        this._refresh();
      }
      if (el.dataset.act === "mode") this._setDirect(el.dataset.value === "start");
    });
    this.shadowRoot.addEventListener("change", (e) => {
      const input = e.target.closest("input[data-act='type']");
      if (input) {
        this._type(input.dataset.entity, input.value);
        return;
      }
      const pick = e.target.closest("select[data-act='value']");
      if (pick) {
        this._type(pick.dataset.entity, pick.value);
        return;
      }
      const el = e.target.closest("select[data-act='select']");
      if (!el) return;
      this._hass
        .callService("select", "select_option", { entity_id: el.dataset.entity, option: el.value })
        .catch((err) => this._error(err));
    });
    // redraw after a drop-down closed (updates were held back while it was open)
    this.shadowRoot.addEventListener("focusout", () => setTimeout(() => this._refresh(), 0));
    this.shadowRoot.addEventListener("focusin", (e) => {
      if (e.target.matches?.("input[data-act='type']")) e.target.select();
    });
    this.shadowRoot.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.target.matches?.("input[data-act='type']")) e.target.blur();
    });
  }

  // Visual editor: Home Assistant builds the form from this description.
  static getConfigForm() {
    const notRecipes = { field: "mode", operator: "not_eq", value: "recipes" };
    const notControl = { field: "mode", operator: "not_eq", value: "control" };
    const options = (keys, prefix) => keys.map((v) => ({ value: v, label: uiText(`${prefix}${v}`) }));
    return {
      schema: [
        {
          name: "mode",
          default: "full",
          required: true,
          selector: { select: { mode: "dropdown", options: options(["full", "control", "recipes"], "ed_mode_") } },
        },
        {
          name: "hide",
          selector: { select: { multiple: true, mode: "list", options: options(["header", "form", "both", "settings"], "ed_hide_") } },
        },
        { name: "name", selector: { text: {} }, visible: notRecipes },
        { name: "device_id", selector: { device: { filter: { integration: "vesync" } } } },
        { name: "direct_start_entity", selector: { entity: { filter: { domain: "input_boolean" } } } },
        { name: "confirm_stop", default: true, selector: { boolean: {} }, visible: notRecipes },
        { name: "basket_entity", selector: { entity: { filter: { domain: "input_select" } } }, visible: notControl },
        { name: "recipe_label", selector: { label: { multiple: true } }, visible: notControl },
        { name: "recipe_filter", selector: { text: {} }, visible: notControl },
        {
          type: "expandable",
          name: "images",
          title: uiText("ed_images"),
          visible: notRecipes,
          schema: [
            { name: "device", selector: { text: {} } },
            { name: "basket", selector: { text: {} } },
            { name: "basket_out", selector: { text: {} } },
          ],
        },
      ],
      computeLabel: (schema) => uiText(`ed_${schema.name}`),
      computeHelper: (schema) => {
        const key = `ed_h_${schema.name}`;
        const text = uiText(key);
        return text === key ? undefined : text;
      },
      // Options the form cannot show keep the visual editor off until they are removed in YAML.
      assertConfig: (config) => {
        if (config.mode && !["full", "control", "recipes"].includes(config.mode)) {
          throw new Error("mode must be full, control or recipes");
        }
        if (config.recipes) throw new Error("recipes can only be set in YAML");
      },
    };
  }

  static getStubConfig() {
    return { mode: "full" };
  }

  getCardSize() {
    return this._config?.mode === "recipes" ? 3 : 9;
  }

  getGridOptions() {
    return { columns: 12, min_columns: 6 };
  }

  setConfig(config) {
    const mode = config.mode || "full";
    if (!["full", "control", "recipes"].includes(mode)) {
      throw new Error("mode must be full, control or recipes");
    }
    this._config = { ...config, mode };
    this._recipeSrc = null;
    this._found = null;
    this._sig = null;
    if (this._hass) this._update();
  }

  set hass(hass) {
    this._hass = hass;
    this._update();
  }

  connectedCallback() {
    // keeps "x min left" and the progress bar current between state changes
    this._ticker = setInterval(() => this._refresh(), 30000);
  }

  disconnectedCallback() {
    clearInterval(this._ticker);
  }

  _refresh() {
    this._sig = null;
    if (this._hass) this._update();
  }

  _t(key, vars = {}) {
    const lang = (this._hass?.language || "en").split("-")[0];
    const table = TEXT[lang] || TEXT.en;
    return (table[key] || TEXT.en[key] || key).replace(/\{(\w+)\}/g, (_, k) => vars[k]);
  }

  // ---- entity discovery -------------------------------------------------

  // Finds the device's entities by translation key; the basket number is read
  // from the entity's name (placeholder "Basket {basket} ...").
  _discover() {
    const hass = this._hass;
    let deviceId = this._config.device_id;
    if (!deviceId) {
      const first = Object.values(hass.entities).find(
        (e) => e.platform === "vesync" && e.translation_key === "cook_status"
      );
      deviceId = first?.device_id;
    }
    if (!deviceId) return null;

    const deviceName = hass.devices?.[deviceId]?.name || "";
    const found = { deviceId, deviceName, entities: {} };
    for (const [id, reg] of Object.entries(hass.entities)) {
      if (reg.device_id !== deviceId || !reg.translation_key) continue;
      const tk = reg.translation_key;
      const name = (hass.states[id]?.attributes?.friendly_name || "").replace(deviceName, "");
      const m = name.match(/(?:^|\D)([12])(?:\D|$)/);
      const slot = (found.entities[tk] ||= {});
      if (m) slot[m[1]] = id;
      else slot.device = id;
    }
    return found;
  }

  _ent(tk, basket) {
    const slot = this._found?.entities?.[tk];
    return slot ? slot[basket] || slot.device : undefined;
  }

  _state(tk, basket) {
    const id = this._ent(tk, basket);
    return id ? this._hass.states[id] : undefined;
  }

  // What can be done with a basket right now.
  _flags(n) {
    const st = this._state("cook_status", n);
    if (!st) return null;
    const s = st.state;
    const set = this._state("cook_set_time", n);
    const hasValues = Boolean(set) && !EMPTY.includes(set.state);
    return {
      s,
      hasValues,
      idle: s === "cooking_end" || (s === "standby" && !hasValues),
      pausable: ACTIVE.includes(s),
      resumable: PAUSED.includes(s),
      stoppable: STOPPABLE.includes(s) || (s === "pull_out" && hasValues),
    };
  }

  // ---- actions -----------------------------------------------------------

  _press(entity, needsConfirm) {
    if (!entity || this._busy.has(entity)) return;
    if (needsConfirm && this._confirmStop && this._confirm !== entity) {
      this._confirm = entity;
      clearTimeout(this._timers.confirm);
      this._timers.confirm = setTimeout(() => {
        this._confirm = null;
        this._refresh();
      }, 3000);
      this._refresh();
      return;
    }
    this._confirm = null;
    this._message = "";
    this._busy.add(entity);
    clearTimeout(this._timers.busy);
    this._timers.busy = setTimeout(() => {
      this._busy.clear();
      this._refresh();
    }, 6000);
    this._hass.callService("button", "press", { entity_id: entity }).catch((err) => {
      this._busy.delete(entity);
      this._error(err);
    });
    this._refresh();
  }

  _step(entity, dir) {
    const st = this._hass.states[entity];
    if (!st) return;
    const a = st.attributes;
    const step = Number(a.step) || 1;
    const base = this._pending[entity] ?? Number(st.state);
    const next = Math.min(Number(a.max), Math.max(Number(a.min), base + dir * step));
    this._pending[entity] = next;
    clearTimeout(this._timers[entity]);
    this._timers[entity] = setTimeout(() => {
      this._hass
        .callService("number", "set_value", { entity_id: entity, value: next })
        .catch((err) => this._error(err));
    }, 400);
    this._refresh();
  }

  // Typed value: snapped to the entity's range and step.
  _type(entity, raw) {
    const st = this._hass.states[entity];
    if (!st) return;
    const a = st.attributes;
    const n = Math.round(Number(String(raw).replace(",", ".")));
    if (!Number.isFinite(n)) {
      this._refresh();
      return;
    }
    const step = Number(a.step) || 1;
    const min = Number(a.min);
    const snapped = min + Math.round((n - min) / step) * step;
    const value = Math.min(Number(a.max), Math.max(min, snapped));
    this._pending[entity] = value;
    this._hass
      .callService("number", "set_value", { entity_id: entity, value })
      .catch((err) => this._error(err));
    this._refresh();
  }

  // Switch "start now" / "only send to the appliance". Kept in an optional helper
  // (direct_start_entity, an input_boolean) so scripts can use the same value.
  get _direct() {
    const id = this._config.direct_start_entity;
    if (id) return this._hass.states[id]?.state !== "off";
    try {
      return localStorage.getItem("vesync-airfryer-card-direct") !== "0";
    } catch (e) {
      return true;
    }
  }

  _setDirect(on) {
    const id = this._config.direct_start_entity;
    if (id) {
      this._hass
        .callService("homeassistant", on ? "turn_on" : "turn_off", { entity_id: id })
        .catch((err) => this._error(err));
      return;
    }
    try {
      localStorage.setItem("vesync-airfryer-card-direct", on ? "1" : "0");
    } catch (e) {
      /* storage not available */
    }
    this._refresh();
  }

  // Ask before stopping (option confirm_stop, on by default).
  get _confirmStop() {
    return this._config.confirm_stop !== false;
  }

  _error(err) {
    this._message = err?.message || String(err);
    clearTimeout(this._timers.message);
    this._timers.message = setTimeout(() => {
      this._message = "";
      this._refresh();
    }, 8000);
    this._refresh();
  }

  // ---- rendering ---------------------------------------------------------

  _update() {
    const hass = this._hass;
    if (!hass || !this._config) return;
    if (!this._found) this._found = this._discover();
    if (!this._found) {
      this._sig = null;
      this.shadowRoot.innerHTML = `<ha-card><div style="padding:16px">${this._t("no_device")}</div></ha-card>`;
      return;
    }
    // do not redraw under an open drop-down or while typing
    const active = this.shadowRoot.activeElement?.tagName;
    if (active === "SELECT" || active === "INPUT") return;

    const ids = Object.values(this._found.entities).flatMap((s) => Object.values(s));
    const states = ids.map((id) => hass.states[id]?.state).join("|");
    if (states !== this._lastStates) {
      // a state changed: commands that were waiting have gone through
      this._busy.clear();
      this._lastStates = states;
    }
    for (const [entity, value] of Object.entries(this._pending)) {
      if (Number(hass.states[entity]?.state) === value) delete this._pending[entity];
    }
    // translated texts can arrive after the first render, so they are part of the signature
    const shown = ["1", "2"].map((n) => {
      const st = this._state("cook_status", n);
      return st ? hass.formatEntityState(st) : "";
    });
    const sig = [
      states,
      hass.language,
      shown.join("|"),
      [...this._busy].join(","),
      this._confirm,
      JSON.stringify(this._pending),
      this._message,
      this._bothOpen,
      this._settingsOpen,
      this._recipesOpen,
      this._direct,
      this._confirmStop,
      this._recipeSig(),
    ].join("#");
    if (sig === this._sig) return;
    this._sig = sig;
    this._render();
  }

  _img(pattern, n) {
    return pattern ? String(pattern).replace("{n}", n) : null;
  }

  _btn({ label, icon, entity, enabled, primary = false, confirm = false, iconOnly = false }) {
    const busy = this._busy.has(entity);
    const asking = confirm && this._confirm === entity;
    const compact = iconOnly && !asking;
    return `<button class="btn ${primary ? "primary" : ""} ${asking ? "ask" : ""} ${compact ? "icon-only" : ""}"
      data-act="press" data-entity="${entity || ""}" title="${label}" aria-label="${label}"
      ${confirm ? 'data-confirm="1"' : ""} ${enabled && entity && !busy ? "" : "disabled"}>
      <ha-icon icon="${busy ? "mdi:loading" : icon}" class="${busy ? "spin" : ""}"></ha-icon>
      ${compact ? "" : `<span>${asking ? this._t("confirm_stop") : label}</span>`}</button>`;
  }

  // ---- recipes -------------------------------------------------------------

  // Recipe scripts: an explicit list (recipes), or every script with one of the labels in
  // recipe_label (default airfryer_rezept) plus, optionally, every script matching recipe_filter.
  _recipeIds() {
    const hass = this._hass;
    if (this._recipeSrc !== hass.entities) {
      this._recipeSrc = hass.entities;
      let ids;
      if (Array.isArray(this._config.recipes)) {
        ids = [...this._config.recipes];
      } else {
        const labels = [].concat(this._config.recipe_label || "airfryer_rezept");
        const pattern = this._config.recipe_filter;
        const re = pattern
          ? new RegExp("^" + pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*") + "$")
          : null;
        ids = Object.entries(hass.entities)
          .filter(([id, e]) => id.startsWith("script.") && (labels.some((l) => (e.labels || []).includes(l)) || (re && re.test(id))))
          .map(([id]) => id);
      }
      const name = (id) => hass.states[id]?.attributes?.friendly_name || id;
      this._recipeList = ids.sort((a, b) => name(a).localeCompare(name(b)));
      this._loadRecipeConfigs();
    }
    return this._recipeList;
  }

  // The values of a recipe are read from the script's configuration (admin users only).
  _loadRecipeConfigs() {
    for (const id of this._recipeList) {
      if (id in this._recipeCfg) continue;
      this._recipeCfg[id] = null;
      this._hass
        .callApi("GET", `config/script/config/${id.split(".")[1]}`)
        .then((cfg) => {
          this._recipeCfg[id] = cfg;
        })
        .catch(() => {
          this._recipeCfg[id] = false;
        })
        .finally(() => this._refresh());
    }
  }

  // Program, temperature, time and basket of a recipe (blueprint inputs or a direct start_cook call).
  _recipeValues(id) {
    const cfg = this._recipeCfg[id];
    if (!cfg) return null;
    let d = cfg.use_blueprint?.input;
    if (!d) {
      const step = (cfg.sequence || []).find((x) => (x.action || x.service) === "vesync.start_cook");
      d = step?.data;
    }
    if (!d) return null;
    const num = (v) => (v !== "" && v !== null && v !== undefined && Number.isFinite(Number(v)) ? Number(v) : null);
    const text = (v) => (typeof v === "string" && !v.includes("{") ? v : null);
    return {
      program: text(d.program),
      temperature: num(d.temperature),
      duration: num(d.duration),
      basket: text(d.basket),
    };
  }

  _recipeDetail(id) {
    const v = this._recipeValues(id);
    if (!v) return "";
    const parts = [];
    if (v.program) {
      const st = this._state("basket_program", "1");
      parts.push(
        st && (st.attributes.options || []).includes(v.program)
          ? this._hass.formatEntityState(st, v.program)
          : v.program
      );
    }
    const unit = this._state("basket_temperature", "1")?.attributes?.unit_of_measurement || "°C";
    if (v.temperature !== null) parts.push(`${v.temperature} ${unit}`);
    if (v.duration !== null) parts.push(this._fmt(v.duration, "min"));
    if (v.basket === "1" || v.basket === "2") parts.push(this._t("basket", { n: v.basket }));
    if (v.basket === "both") parts.push(this._t("both"));
    return parts.join(" · ");
  }

  _recipeSig() {
    if (this._config.mode === "control") return "";
    const hass = this._hass;
    const helper = this._config.basket_entity ? hass.states[this._config.basket_entity]?.state : "";
    return (
      this._recipeIds()
        .map((id) => `${id}:${hass.states[id]?.state}:${this._recipeCfg[id] ? 1 : 0}`)
        .join(",") + helper
    );
  }

  _runRecipe(id) {
    if (!id || this._busy.has(id)) return;
    this._message = "";
    this._busy.add(id);
    clearTimeout(this._timers.busy);
    this._timers.busy = setTimeout(() => {
      this._busy.clear();
      this._refresh();
    }, 6000);
    this._hass.callService("script", "turn_on", { entity_id: id }).catch((err) => {
      this._busy.delete(id);
      this._error(err);
    });
    this._refresh();
  }

  _recipes() {
    const hass = this._hass;
    const helper = this._config.basket_entity ? hass.states[this._config.basket_entity] : null;
    const picker = helper
      ? `<div class="mode" role="group">${(helper.attributes.options || [])
          .map(
            (o) => `<button data-act="basket-opt" data-value="${o}" class="${o === helper.state ? "on" : ""}"
              aria-pressed="${o === helper.state}"><span>${o}</span></button>`
          )
          .join("")}</div>`
      : "";
    const tiles = this._recipeIds()
      .map((id) => {
        const st = hass.states[id];
        if (!st) return "";
        const running = st.state === "on" || this._busy.has(id);
        return `<button class="recipe" data-act="recipe" data-entity="${id}">
          <ha-icon icon="${running ? "mdi:loading" : st.attributes.icon || "mdi:chef-hat"}" class="${running ? "spin" : ""}"></ha-icon>
          <span class="r-text"><span class="r-name">${st.attributes.friendly_name || id}</span>
          <span class="r-detail">${this._recipeDetail(id)}</span></span>
          <ha-icon class="go" icon="${this._direct ? "mdi:play" : "mdi:send"}"></ha-icon></button>`;
      })
      .join("");
    const body = tiles ? `<div class="tiles">${tiles}</div>` : `<div class="note">${this._t("no_recipes")}</div>`;
    // The recipes-only variant always shows the list; otherwise it folds like the other sections.
    if (this._config.mode === "recipes") {
      return `<div class="recipes">
      <div class="recipes-head"><span>${this._t("recipes")}</span>${picker}</div>
      ${body}
    </div>`;
    }
    const open = this._recipesOpen;
    const toggle = `<button class="both-toggle" data-act="toggle-recipes" aria-expanded="${open}">
        <span>${this._t("recipes")}</span><ha-icon icon="${open ? "mdi:chevron-up" : "mdi:chevron-down"}"></ha-icon></button>`;
    if (!open) return `<div class="both">${toggle}</div>`;
    return `<div class="both">${toggle}</div>
    <div class="recipes">
      ${picker ? `<div class="recipes-pick">${picker}</div>` : ""}
      ${body}
    </div>`;
  }

  // Minutes from 60 on are shown as hours ("1 h 30 min"); the value itself stays in minutes.
  _fmt(v, unit) {
    if (unit !== "min" || v < 60) return `${v} ${unit}`;
    const h = Math.floor(v / 60);
    const m = v % 60;
    return m ? `${h} h ${m} min` : `${h} h`;
  }

  // Value in the middle of a stepper: a native picker (a wheel on iOS) when the list of
  // allowed values is short enough, otherwise a typed field.
  _valueField(entity, st, value, unit, off) {
    const a = st.attributes;
    const min = Number(a.min);
    const max = Number(a.max);
    const step = Number(a.step) || 1;
    const label = a.friendly_name || "";
    const count = Math.floor((max - min) / step) + 1;
    if (Number.isFinite(count) && count > 0 && count <= 300) {
      const values = [];
      for (let v = min; v <= max; v += step) values.push(v);
      if (!values.includes(value)) {
        values.push(value);
        values.sort((x, y) => x - y);
      }
      const options = values
        .map((v) => `<option value="${v}" ${v === value ? "selected" : ""}>${this._fmt(v, unit)}</option>`)
        .join("");
      return `<select class="pick" data-act="value" data-entity="${entity}" aria-label="${label}" ${off}>${options}</select>`;
    }
    return `<label class="val"><input data-act="type" data-entity="${entity}" type="text" inputmode="numeric" pattern="[0-9]*"
        value="${value}" aria-label="${label}" ${off}><span class="unit">${unit}</span></label>`;
  }

  _stepper(entity, enabled) {
    const st = this._hass.states[entity];
    if (!st) return "";
    const pending = this._pending[entity];
    const value = pending !== undefined ? pending : Number(st.state);
    const unit = st.attributes.unit_of_measurement || "";
    const off = enabled ? "" : "disabled";
    return `<div class="stepper">
      <button data-act="step" data-entity="${entity}" data-dir="-1" ${off} aria-label="-"><ha-icon icon="mdi:minus"></ha-icon></button>
      ${this._valueField(entity, st, value, unit, off)}
      <button data-act="step" data-entity="${entity}" data-dir="1" ${off} aria-label="+"><ha-icon icon="mdi:plus"></ha-icon></button>
    </div>`;
  }

  _select(entity, enabled) {
    const st = this._hass.states[entity];
    if (!st) return "";
    const options = (st.attributes.options || [])
      .map(
        (o) =>
          `<option value="${o}" ${o === st.state ? "selected" : ""}>${this._hass.formatEntityState(st, o)}</option>`
      )
      .join("");
    return `<select data-act="select" data-entity="${entity}" ${enabled ? "" : "disabled"}>${options}</select>`;
  }

  _basket(n) {
    const hass = this._hass;
    const img = this._config.images || {};
    const f = this._flags(n);
    if (!f) return "";
    const status = this._state("cook_status", n);
    const end = this._state("cook_end_time", n);
    const time = this._state("basket_time", n);
    const color =
      STATUS_COLOR[f.s] ||
      (f.s === "standby" && f.hasValues ? "var(--info-color)" : "var(--secondary-text-color)");

    const lines = [];
    let pct = 0;
    let showBar = false;
    if (end && !EMPTY.includes(end.state)) {
      const endDate = new Date(end.state);
      // "End time" is rounded to whole minutes by the integration, so round (not ceil) the minutes left.
      const rem = Math.max(0, endDate - Date.now());
      const clock = endDate.toLocaleTimeString(hass.language, { hour: "2-digit", minute: "2-digit" });
      lines.push(`${this._t("done_at")} ${clock} · ${this._t("left", { n: Math.max(1, Math.round(rem / 60000)) })}`);
      const total = Number(time?.state) * 60000;
      pct = total ? Math.min(100, Math.max(0, 100 - (rem / total) * 100)) : 0;
      showBar = true;
    }
    if (f.s === "ready") lines.push(this._t("ready_hint"));
    if (f.s === "standby" && f.hasValues) lines.push(this._t("panel_hint"));

    const picture = this._img(f.s === "pull_out" ? img.basket_out : img.basket, n);
    const dim = f.s === "standby" && !f.hasValues ? "dim" : "";
    const visual = picture
      ? `<img class="pic ${dim}" src="${picture}" alt="">`
      : `<ha-icon class="pic icon ${dim}" icon="mdi:tray-full"></ha-icon>`;

    // fixed slots: A = Start or Send (per switch) / Pause / Resume, B = Stop
    const direct = this._direct;
    const slotA = f.pausable
      ? { label: this._t("pause"), icon: "mdi:pause", entity: this._ent("basket_pause", n), enabled: true }
      : f.resumable
        ? { label: this._t("resume"), icon: "mdi:play", entity: this._ent("basket_resume", n), enabled: true }
        : direct
          ? { label: this._t("start"), icon: "mdi:play", entity: this._ent("basket_start", n), enabled: f.idle }
          : { label: this._t("send"), icon: "mdi:send", entity: this._ent("basket_send", n), enabled: f.idle };
    const slotB = { label: this._t("stop"), icon: "mdi:stop", entity: this._ent("basket_stop", n), enabled: f.stoppable, confirm: true };

    return `
      <div class="basket" data-basket="${n}">
        <div class="visual">${visual}</div>
        <div class="text">
          <div class="title">${this._t("basket", { n })} · ${this._t(n === "1" ? "top" : "bottom")}</div>
          <div class="status" style="color:${color}">${hass.formatEntityState(status)}</div>
          ${lines.length ? `<div class="details">${lines.join("<br>")}</div>` : ""}
        </div>
        <div class="actions">
          ${slotB.enabled ? this._btn({ ...slotB, iconOnly: true }) : ""}
          ${this._btn({ ...slotA, primary: true, iconOnly: true })}
        </div>
        ${this._hide.includes("form") ? "" : `<div class="form">
          ${this._select(this._ent("basket_program", n), f.idle)}
          ${this._stepper(this._ent("basket_temperature", n), f.idle)}
          ${this._stepper(this._ent("basket_time", n), f.idle)}
        </div>`}
        ${showBar ? `<div class="bar"><div style="width:${pct}%;background:${color}"></div></div>` : ""}
      </div>`;
  }

  _header() {
    const hass = this._hass;
    const a = this._state("cook_status", "1");
    const b = this._state("cook_status", "2");
    const name = this._config.name || this._found.deviceName || "Air fryer";
    const sub = !a ? "" : !b || a.state === b.state
      ? hass.formatEntityState(a)
      : `${hass.formatEntityState(a)} · ${hass.formatEntityState(b)}`;
    const pic = this._config.images?.device;
    const visual = pic
      ? `<img class="pic" src="${pic}" alt="">`
      : `<ha-icon class="pic icon" icon="mdi:french-fries"></ha-icon>`;
    return `
      <div class="head">
        <div class="visual">${visual}</div>
        <div class="name">${name}</div>
        <div class="sub">${sub}</div>
      </div>`;
  }

  _both() {
    const f1 = this._flags("1");
    const f2 = this._flags("2");
    if (!f1 || !f2) return "";
    const both = f1.idle && f2.idle;
    const any = (k) => f1[k] || f2[k];
    const open = this._bothOpen;
    const toggle = `<button class="both-toggle" data-act="toggle" aria-expanded="${open}">
        <span>${this._t("both")}</span><ha-icon icon="${open ? "mdi:chevron-up" : "mdi:chevron-down"}"></ha-icon></button>`;
    if (!open) return `<div class="both">${toggle}</div>`;
    return `
      <div class="both">
        ${toggle}
        <div class="both-row">
          ${this._select(this._ent("start_mode"), both)}
          ${this._direct
            ? this._btn({ label: this._t("start_both"), icon: "mdi:play", entity: this._ent("start_both"), enabled: both, primary: true })
            : this._btn({ label: this._t("send_both"), icon: "mdi:send", entity: this._ent("send_both"), enabled: both, primary: true })}
        </div>
        <div class="footer">
          ${this._btn({ label: this._t("pause_all"), icon: "mdi:pause", entity: this._ent("pause_all"), enabled: any("pausable") })}
          ${this._btn({ label: this._t("resume_all"), icon: "mdi:play", entity: this._ent("resume_all"), enabled: any("resumable") })}
          ${any("stoppable") ? this._btn({ label: this._t("stop_all"), icon: "mdi:stop", entity: this._ent("stop_all"), enabled: true, confirm: true }) : ""}
          ${this._btn({ label: this._t("leave_sync"), icon: "mdi:link-off", entity: this._ent("quit_sync"), enabled: f1.s === "hold" || f2.s === "hold" })}
        </div>
      </div>`;
  }

  _settings() {
    const direct = this._direct;
    const open = this._settingsOpen;
    const toggle = `<button class="both-toggle" data-act="toggle-settings" aria-expanded="${open}">
        <span>${this._t("settings")}</span><ha-icon icon="${open ? "mdi:chevron-up" : "mdi:chevron-down"}"></ha-icon></button>`;
    if (!open) return `<div class="both">${toggle}</div>`;
    return `
      <div class="both">
        ${toggle}
        <div class="setting">
          <div class="setting-text">
            <div>${this._t("action_button")}</div>
            <div class="hint">${this._t("action_hint")}</div>
          </div>
          <div class="mode" role="group">
            <button data-act="mode" data-value="start" class="${direct ? "on" : ""}" aria-pressed="${direct}">
              <ha-icon icon="mdi:play"></ha-icon><span>${this._t("start")}</span></button>
            <button data-act="mode" data-value="send" class="${direct ? "" : "on"}" aria-pressed="${!direct}">
              <ha-icon icon="mdi:send"></ha-icon><span>${this._t("send")}</span></button>
          </div>
        </div>
      </div>`;
  }

  get _hide() {
    return Array.isArray(this._config.hide) ? this._config.hide : [];
  }

  _render() {
    const mode = this._config.mode;
    let body = "";
    const hide = this._hide;
    if (mode !== "recipes") {
      if (!hide.includes("header")) body += this._header();
      body += `<div class="baskets">${this._basket("1")}${this._basket("2")}</div>`;
      if (!hide.includes("both")) body += this._both();
    }
    if (mode !== "control") body += this._recipes();
    if (!hide.includes("settings")) body += this._settings();
    body += `<div class="msg">${this._message}</div>`;
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: block; }
        ha-card { padding: 12px 14px; }
        .head { display: grid; grid-template-columns: 56px minmax(0, 1fr); column-gap: 14px; align-items: center; margin-bottom: 8px; }
        .head .visual { grid-row: span 2; }
        .mode { display: flex; flex: none; overflow: hidden;
          border: 1px solid var(--divider-color); border-radius: var(--ha-card-border-radius, 12px); }
        .mode button { all: unset; box-sizing: border-box; padding: 0 12px; min-height: 36px; display: flex;
          align-items: center; justify-content: center; gap: 6px; cursor: pointer; font-size: 14px;
          color: var(--secondary-text-color); }
        .mode button ha-icon { --mdc-icon-size: 18px; }
        .mode button.on { background: var(--primary-color); color: var(--text-primary-color); }
        .mode button:focus-visible { outline: 2px solid var(--primary-color); outline-offset: -2px; }
        .name { font-size: 18px; font-weight: 600; align-self: end; }
        .sub { font-size: 13px; color: var(--secondary-text-color); align-self: start; }
        .baskets { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 12px; }
        .basket { display: grid; grid-template-columns: 48px minmax(0, 1fr) auto; column-gap: 12px; align-items: center; align-content: start;
          padding: 10px 12px; border-radius: var(--ha-card-border-radius, 12px);
          background: var(--secondary-background-color); }
        .text { display: flex; flex-direction: column; gap: 0; justify-content: center; min-height: 48px; }
        .title { font-size: 14px; line-height: 1.2; color: var(--secondary-text-color); }
        .status { font-size: 22px; line-height: 1.2; font-weight: 600; }
        .details { font-size: 13px; line-height: 1.45; }
        .form { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(auto-fit, minmax(104px, 1fr)); gap: 6px; margin-top: 8px; }
        .wide { grid-column: 1 / -1; }
        .actions { display: flex; gap: 6px; }
        .bar { grid-column: 1 / -1; margin-top: 8px; height: 6px; border-radius: 3px; background: var(--divider-color); overflow: hidden; }
        .bar div { height: 100%; border-radius: 3px; }
        .pic { width: 100%; display: block; }
        .icon { --mdc-icon-size: 40px; color: var(--secondary-text-color); display: flex; justify-content: center; }
        .head .icon { --mdc-icon-size: 40px; }
        .dim { opacity: .55; filter: grayscale(.5); }

        select, .btn, .stepper { box-sizing: border-box; min-height: 38px; border-radius: var(--ha-card-border-radius, 12px);
          border: 1px solid var(--divider-color); background: var(--card-background-color);
          color: var(--primary-text-color); font: inherit; }
        select { width: 100%; padding: 0 8px; min-width: 0; text-overflow: ellipsis; }
        .stepper { display: flex; align-items: center; justify-content: space-between; overflow: hidden; }
        .stepper button { all: unset; box-sizing: border-box; width: 28px; align-self: stretch; display: flex;
          align-items: center; justify-content: center; cursor: pointer; color: var(--primary-text-color); }
        .stepper .val { display: flex; align-items: baseline; justify-content: center; gap: 2px; min-width: 0;
          font-weight: 500; white-space: nowrap; }
        .stepper select.pick { appearance: none; -webkit-appearance: none; border: 0; background: transparent;
          min-height: 0; padding: 0; width: auto; flex: 1; min-width: 0; text-align: center; text-align-last: center;
          font-size: 15px; font-weight: 500; color: var(--primary-text-color); }
        .stepper input { all: unset; box-sizing: content-box; width: 4ch; text-align: right; font-size: 15px;
          color: var(--primary-text-color); user-select: text; -webkit-user-select: text; }
        .stepper input:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; border-radius: 4px; }
        .stepper input:disabled { opacity: .4; }
        .unit { font-size: 12px; color: var(--secondary-text-color); }
        .btn { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 0 12px; cursor: pointer; }
        .btn.icon-only { width: 38px; padding: 0; }
        .btn ha-icon { --mdc-icon-size: 20px; }
        .stepper ha-icon { --mdc-icon-size: 18px; }
        .btn.primary { background: var(--primary-color); border-color: var(--primary-color); color: var(--text-primary-color); }
        .btn.ask { background: var(--error-color); border-color: var(--error-color); color: var(--text-primary-color); }
        button[disabled], select[disabled] { opacity: .4; cursor: default; pointer-events: none; }
        button:focus-visible, select:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) { .spin { animation: none; } }

        .both { margin-top: 12px; padding: 4px 12px; border-radius: var(--ha-card-border-radius, 12px);
          background: var(--secondary-background-color); }
        .both-toggle { all: unset; box-sizing: border-box; width: 100%; min-height: 40px; display: flex; align-items: center;
          justify-content: space-between; cursor: pointer; font-size: 14px; color: var(--secondary-text-color); }
        .both-toggle:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
        .setting { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 4px 0 10px; }
        .setting-text { min-width: 0; font-size: 14px; }
        .hint { font-size: 12px; color: var(--secondary-text-color); }
        .both-row { display: grid; grid-template-columns: 1fr auto; gap: 8px; margin-top: 4px; }
        .footer { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 8px; margin: 8px 0 8px; }
        .recipes { margin-top: 12px; }
        .recipes-head { display: flex; align-items: center; justify-content: space-between; gap: 12px;
          min-height: 40px; font-size: 14px; color: var(--secondary-text-color); }
        .recipes-pick { display: flex; justify-content: flex-end; margin: 8px 0; }
        .recipes-pick .mode button { min-height: 32px; font-size: 13px; padding: 0 10px; }
        .recipes-head .mode button { min-height: 32px; font-size: 13px; padding: 0 10px; }
        .tiles { display: grid; grid-template-columns: 1fr; gap: 6px; margin-top: 4px; }
        .recipe { all: unset; box-sizing: border-box; display: flex; align-items: center; gap: 10px; padding: 10px 12px;
          min-height: 56px; cursor: pointer; border-radius: var(--ha-card-border-radius, 12px);
          background: var(--secondary-background-color); color: var(--primary-text-color); }
        .recipe:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
        .recipe ha-icon { --mdc-icon-size: 24px; flex: none; color: var(--primary-color); }
        .r-text { display: flex; flex-direction: column; min-width: 0; flex: 1; }
        .recipe .go { --mdc-icon-size: 20px; color: var(--secondary-text-color); }
        .r-name { font-size: 14px; font-weight: 500; overflow: hidden; overflow-wrap: anywhere;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
        .r-detail { font-size: 12px; color: var(--secondary-text-color); }
        .note { margin-top: 12px; color: var(--secondary-text-color); font-size: 13px; }
        .msg { min-height: 1.2em; margin-top: 8px; font-size: 13px; color: var(--error-color); }
      </style>
      <ha-card>${body}</ha-card>`;
  }
}

customElements.define("vesync-airfryer-card", VesyncAirfryerCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "vesync-airfryer-card",
  name: "VeSync Air Fryer Card",
  description: "Control card for dual-basket VeSync air fryers (full, control only or recipes only).",
  preview: false,
  documentationURL: "https://github.com/KindOfNerdy/vesync-airfryer-card",
});
console.info(`%c VESYNC-AIRFRYER-CARD %c ${CARD_VERSION} `, "color:white;background:#555", "color:#555");
