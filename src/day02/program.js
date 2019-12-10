class Program {
    constructor(memory, input1, input2) {
        this.memory = memory.slice();  
        if(input1 && input2) {
            this.memory[1] = input1;
            this.memory[2] = input2;
        }
        this.address = 0;
        this.debug = false;
    }

    getOutput() {
        return this.memory[0];
    }

    run() {
        while(true) {
            const instruction = this.memory[this.address];
            switch(instruction) {
                case 1:
                    this.op1();
                    break;
                case 2:
                    this.op2();
                    break;
                case 99:
                    return 0;
            
                default:
                    return -1;
            }
        }
    }

    // add
    op1(){
        const in1 = this.memory[this.address + 1];
        const in2 = this.memory[this.address + 2];
        const out = this.memory[this.address + 3];

        this.memory[out] = this.memory[in1] + this.memory[in2];
        this.address += 4
    }

    // multiply
    op2() {
        const in1 = this.memory[this.address + 1];
        const in2 = this.memory[this.address + 2];
        const out = this.memory[this.address + 3];

        this.memory[out] = this.memory[in1] * this.memory[in2];
        this.address += 4
    }
}

module.exports = {
    Program
}
