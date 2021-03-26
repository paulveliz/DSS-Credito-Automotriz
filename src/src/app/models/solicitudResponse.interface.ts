// To parse this data:
//
//   import { Convert, SolicitudResponse } from "./file";
//
//   const solicitudResponse = Convert.toSolicitudResponse(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface SolicitudResponse {
    id_solicitud:    number;
    fecha_solicitud: Date;
    cliente:         Cliente;
    resultados:      Resultados;
}

export interface Cliente {
    id_cliente:                number;
    curp:                      string;
    nombre_completo:           string;
    ingreso_acumulable_actual: number;
}

export interface Resultados {
    aprobado:      boolean;
    plan_sugerido: PlanSugerido;
}

export interface PlanSugerido {
    id_plan:                number;
    descripcion:            string;
    precio_inicial:         number;
    precio_limite:          number;
    min_ingreso_acumulable: number;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toSolicitudResponse(json: string): SolicitudResponse {
        return cast(JSON.parse(json), r("SolicitudResponse"));
    }

    public static solicitudResponseToJson(value: SolicitudResponse): string {
        return JSON.stringify(uncast(value, r("SolicitudResponse")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "SolicitudResponse": o([
        { json: "id_solicitud", js: "id_solicitud", typ: 0 },
        { json: "fecha_solicitud", js: "fecha_solicitud", typ: Date },
        { json: "cliente", js: "cliente", typ: r("Cliente") },
        { json: "resultados", js: "resultados", typ: r("Resultados") },
    ], false),
    "Cliente": o([
        { json: "id_cliente", js: "id_cliente", typ: 0 },
        { json: "curp", js: "curp", typ: "" },
        { json: "nombre_completo", js: "nombre_completo", typ: "" },
        { json: "ingreso_acumulable_actual", js: "ingreso_acumulable_actual", typ: 0 },
    ], false),
    "Resultados": o([
        { json: "aprobado", js: "aprobado", typ: true },
        { json: "plan_sugerido", js: "plan_sugerido", typ: r("PlanSugerido") },
    ], false),
    "PlanSugerido": o([
        { json: "id_plan", js: "id_plan", typ: 0 },
        { json: "descripcion", js: "descripcion", typ: "" },
        { json: "precio_inicial", js: "precio_inicial", typ: 0 },
        { json: "precio_limite", js: "precio_limite", typ: 0 },
        { json: "min_ingreso_acumulable", js: "min_ingreso_acumulable", typ: 0 },
    ], false),
};
