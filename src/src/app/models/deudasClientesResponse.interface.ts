// To parse this data:
//
//   import { Convert, DeudasClientesResponse } from "./file";
//
//   const deudasClientesResponse = Convert.toDeudasClientesResponse(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface DeudasClientesResponse {
    id:                         number;
    idCliente:                  number;
    fecha:                      Date;
    ultimoAbono:                null;
    idFinanciamiento:           number;
    idSolicitud:                number;
    idClienteNavigation:        IDClienteNavigation;
    idFinanciamientoNavigation: IDFinanciamientoNavigation;
    idSolicitudNavigation:      IDSolicitudNavigation;
}

export interface IDSolicitudNavigation {
    id:                             number;
    idCliente:                      number;
    fecha:                          Date;
    aprobado:                       boolean;
    idPlanFinanciamiento:           number;
    idPlanFinanciamientoNavigation: null;
    deuda:                          any[];
    idClienteNavigation?:           IDClienteNavigation;
}

export interface IDFinanciamientoNavigation {
    id:                    number;
    idCliente:             number;
    valorDelAuto:          number;
    enganche:              number;
    cantidadAFinanciar:    number;
    meses:                 number;
    mensualidad:           number;
    idAutomovil:           number;
    idAutomovilNavigation: IDAutomovilNavigation;
    deuda:                 any[];
    idClienteNavigation?:  IDClienteNavigation;
}

export interface IDClienteNavigation {
    id:                      number;
    nombreCompleto:          string;
    fechaNacimiento:         Date;
    domicilio:               string;
    curp:                    string;
    ingresosMensuales:       number;
    urlImagen:               string;
    edad:                    number;
    idEstadoCivil:           number;
    idEstadoCivilNavigation: null;
    deuda:                   any[];
    financiamientos:         IDFinanciamientoNavigation[];
    hijos:                   any[];
    solicitudes:             IDSolicitudNavigation[];
}

export interface IDAutomovilNavigation {
    id:                             number;
    valorComecial:                  number;
    urlImagen:                      string;
    idPlanFinanciamiento:           number;
    idModelo:                       number;
    idModeloNavigation:             IDModeloNavigation;
    idPlanFinanciamientoNavigation: null;
    financiamientos:                any[];
}

export interface IDModeloNavigation {
    id:                number;
    nombre:            string;
    idMarca:           number;
    idMarcaNavigation: IDMarcaNavigation;
    autos:             any[];
}

export interface IDMarcaNavigation {
    id:        number;
    nombre:    string;
    urlImagen: string;
    modelos:   any[];
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toDeudasClientesResponse(json: string): DeudasClientesResponse {
        return cast(JSON.parse(json), r("DeudasClientesResponse"));
    }

    public static deudasClientesResponseToJson(value: DeudasClientesResponse): string {
        return JSON.stringify(uncast(value, r("DeudasClientesResponse")), null, 2);
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
    "DeudasClientesResponse": o([
        { json: "id", js: "id", typ: 0 },
        { json: "idCliente", js: "idCliente", typ: 0 },
        { json: "fecha", js: "fecha", typ: Date },
        { json: "ultimoAbono", js: "ultimoAbono", typ: null },
        { json: "idFinanciamiento", js: "idFinanciamiento", typ: 0 },
        { json: "idSolicitud", js: "idSolicitud", typ: 0 },
        { json: "idClienteNavigation", js: "idClienteNavigation", typ: r("IDClienteNavigation") },
        { json: "idFinanciamientoNavigation", js: "idFinanciamientoNavigation", typ: r("IDFinanciamientoNavigation") },
        { json: "idSolicitudNavigation", js: "idSolicitudNavigation", typ: r("IDSolicitudNavigation") },
    ], false),
    "IDSolicitudNavigation": o([
        { json: "id", js: "id", typ: 0 },
        { json: "idCliente", js: "idCliente", typ: 0 },
        { json: "fecha", js: "fecha", typ: Date },
        { json: "aprobado", js: "aprobado", typ: true },
        { json: "idPlanFinanciamiento", js: "idPlanFinanciamiento", typ: 0 },
        { json: "idPlanFinanciamientoNavigation", js: "idPlanFinanciamientoNavigation", typ: null },
        { json: "deuda", js: "deuda", typ: a("any") },
        { json: "idClienteNavigation", js: "idClienteNavigation", typ: u(undefined, r("IDClienteNavigation")) },
    ], false),
    "IDFinanciamientoNavigation": o([
        { json: "id", js: "id", typ: 0 },
        { json: "idCliente", js: "idCliente", typ: 0 },
        { json: "valorDelAuto", js: "valorDelAuto", typ: 0 },
        { json: "enganche", js: "enganche", typ: 0 },
        { json: "cantidadAFinanciar", js: "cantidadAFinanciar", typ: 0 },
        { json: "meses", js: "meses", typ: 0 },
        { json: "mensualidad", js: "mensualidad", typ: 0 },
        { json: "idAutomovil", js: "idAutomovil", typ: 0 },
        { json: "idAutomovilNavigation", js: "idAutomovilNavigation", typ: r("IDAutomovilNavigation") },
        { json: "deuda", js: "deuda", typ: a("any") },
        { json: "idClienteNavigation", js: "idClienteNavigation", typ: u(undefined, r("IDClienteNavigation")) },
    ], false),
    "IDClienteNavigation": o([
        { json: "id", js: "id", typ: 0 },
        { json: "nombreCompleto", js: "nombreCompleto", typ: "" },
        { json: "fechaNacimiento", js: "fechaNacimiento", typ: Date },
        { json: "domicilio", js: "domicilio", typ: "" },
        { json: "curp", js: "curp", typ: "" },
        { json: "ingresosMensuales", js: "ingresosMensuales", typ: 0 },
        { json: "urlImagen", js: "urlImagen", typ: "" },
        { json: "edad", js: "edad", typ: 0 },
        { json: "idEstadoCivil", js: "idEstadoCivil", typ: 0 },
        { json: "idEstadoCivilNavigation", js: "idEstadoCivilNavigation", typ: null },
        { json: "deuda", js: "deuda", typ: a("any") },
        { json: "financiamientos", js: "financiamientos", typ: a(r("IDFinanciamientoNavigation")) },
        { json: "hijos", js: "hijos", typ: a("any") },
        { json: "solicitudes", js: "solicitudes", typ: a(r("IDSolicitudNavigation")) },
    ], false),
    "IDAutomovilNavigation": o([
        { json: "id", js: "id", typ: 0 },
        { json: "valorComecial", js: "valorComecial", typ: 0 },
        { json: "urlImagen", js: "urlImagen", typ: "" },
        { json: "idPlanFinanciamiento", js: "idPlanFinanciamiento", typ: 0 },
        { json: "idModelo", js: "idModelo", typ: 0 },
        { json: "idModeloNavigation", js: "idModeloNavigation", typ: r("IDModeloNavigation") },
        { json: "idPlanFinanciamientoNavigation", js: "idPlanFinanciamientoNavigation", typ: null },
        { json: "financiamientos", js: "financiamientos", typ: a("any") },
    ], false),
    "IDModeloNavigation": o([
        { json: "id", js: "id", typ: 0 },
        { json: "nombre", js: "nombre", typ: "" },
        { json: "idMarca", js: "idMarca", typ: 0 },
        { json: "idMarcaNavigation", js: "idMarcaNavigation", typ: r("IDMarcaNavigation") },
        { json: "autos", js: "autos", typ: a("any") },
    ], false),
    "IDMarcaNavigation": o([
        { json: "id", js: "id", typ: 0 },
        { json: "nombre", js: "nombre", typ: "" },
        { json: "urlImagen", js: "urlImagen", typ: "" },
        { json: "modelos", js: "modelos", typ: a("any") },
    ], false),
};
