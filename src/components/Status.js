export default function(hp, dmg, spd, rps) {
  return {
    id: 'status',
    hp,
    dmg,
    spd,
    rps,
    hit(dmg) {
      hp -= dmg;
      if (hp <= 0)
        this.destroy();
    }
  }
}
