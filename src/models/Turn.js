/* Esta es una clase auxiliar, la cual no persiste en la base de datos. Su función es simplificar el trabajo del front-end*/
class Turn {
    constructor(hora, busy) {
        this.hora = hora;
        this.busy = busy;
    }
}

module.exports = Turn;