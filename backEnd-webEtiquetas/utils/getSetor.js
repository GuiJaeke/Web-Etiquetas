function getSetor(setor) {
    let printer = setor
    let num = parseInt(setor)
    switch(num) {
        case 1: 
            printer = '\\\\192.168.3.223\\ETIQUETAPNEU'   
            break
        case 2: 
            printer = '\\\\192.168.3.9\\ZEBRA01'    
            break
        case 3: 
            printer = '\\\\192.168.3.4\\ZEBRAZD02'    
            break
        case 4: 
            printer = '\\\\192.168.3.244\\ZEBRAFUNDO2'
            break
        case 5: 
            printer = '\\\\192.168.3.26\\VAGNER'    
            break
        case 6: 
            printer = '\\\\192.168.3.52\\ZCONSULTA'    
            break
        case 7: 
            printer = '\\\\192.168.3.32\\ARGOX'    
            break
        case 8:
            printer = '\\\\192.168.3.235\\ZEBRA' 
            break
        case 9:
            printer = '\\\\192.168.3.19\\ZEBRAORL' 
            break
        case 10:
            printer = '\\\\192.168.3.18\\ZEBRAORLEON' 
            break
        case 11:
            printer = '\\\\192.168.3.16\\ZDesigner' 
            break
        case 99:
            printer = '\\\\192.168.3.53\\ZDJK'   
            break
        default:
            printer = 'Impressora não selecionada' 
            break
    }
    console.log(printer);
    
    return printer
}
module.exports = getSetor