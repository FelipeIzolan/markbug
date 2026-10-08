// state(0) = 'idle', { timer }
// state(1) = 'move', { timer, pos(), init() }
// state(2) = 'shot', 

export default function(k, states) {
  return {
    id: 'machine',
    require: ['pos', 'status'],
    machine: {
      index: -1,
      states,
      next(obj) {
        this.index++;
        let curr = this.states[this.index];
        if (curr) {
          curr.init?.();
        } else {
          obj.destroy();
        } 
      }
    },
    add() {
      this.machine.next(this);
    },
    update() {
      let dt = k.dt();
      let curr = this.machine.states[this.machine.index];
      switch (curr.state) {
        case 1:
          this.moveTo(curr.pos(this, dt));
        case 0:
        case 1:
          curr.timer -= dt;
          if (curr.timer <= 0) {
            this.machine.next(this);
          }
          break;
        case 2:
          this.machine.next(this);
        break;
      }
    }
  }
} 
