export class ReciboTemplate{
    
    public html:string;

    constructor() {
        this.html = `
        <div style="
        display: flex; 
        flex-flow: column wrap;
        justify-content: center;
        align-items: center;
        text-align: center;
    ">
        <h1 style="color: brown; text-shadow: 1px 1px 4px black; font-weight: 300;" >FICHA DE PAGO</h1>
        <p style="padding: 0; margin: 0; font-weight: 400;">
            Auto Shop UAdeO - 26/04/2021
        </p>
    </div>
    <hr>
    <div style="
        display: flex; 
        flex-flow: column wrap;
        justify-content: center;
        align-items: center;
        text-align: center;
    ">
    
        <div>
            <b style="display: block;">Cliente:</b>
            <span>Paul Guadalupe Veliz lopez</span>
            <b style="display: block;" >CURP</b>
            <span>VELP12321312JJS</span>
        </div>
    
        <div>
            <b style="display: block;">Cliente:</b>
            <span>Paul Guadalupe Veliz lopez</span>
            <b style="display: block;" >CURP</b>
            <span>VELP12321312JJS</span>
        </div>
    
        <div>
            <b style="display: block;">Cliente:</b>
            <span>Paul Guadalupe Veliz lopez</span>
            <b style="display: block;" >CURP</b>
            <span>VELP12321312JJS</span>
        </div>
    
    
    
    </div>
        `;
    }
}