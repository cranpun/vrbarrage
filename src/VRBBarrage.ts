import { registerComponent, Scene, Entity } from "aframe";

export function vrbbarageRegister() {
    registerComponent("init-vrbbarrage", {
        init: () => {
            console.log("init");
            const b = new VRBBarrage();
            b.setBullets();
        }
    });

}

export class VRBBarrage {
    private scene: Scene;
    private readonly counts: number = 36;
    private bullets: Entity[];

    public constructor() {
        this.scene = <Scene>document.querySelector("#vrb-scene");
        this.bullets = [];
        console.log("const");
    }

    public async setBullets() {
        console.log("set");
        for (let i: number = 0; i < this.counts; i++) {
            const bullet: Entity = document.createElement("a-entity");
            bullet.setAttribute("material", { color: "yellow" });
            bullet.setAttribute("position", this.makeFrompos(i));
            // bullet.setAttribute("radius", "0.5");
            bullet.setAttribute("geometry", "primitive: sphere");
            bullet.setAttribute("id", `b${i}`);
            bullet.addEventListener("animationcomplete", () => {
                bullet.setAttribute("visible", false);
            })
            this.scene.appendChild(bullet);
            console.log("seted");
            this.bullets.push(bullet);
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        // 全部設置したら移動開始
        for (const bullet of this.bullets) {
            const st = bullet.getAttribute("position");
            const topos = this.makeTopos(st);
            const from = `${st.x} ${st.y} ${st.z}`;
            const to = `${topos.x} ${topos.y} ${topos.z}`;
            const anime = `property: position; to: ${to}; dur: 3000`;
            console.log(anime);
            bullet.setAttribute("animation", anime);
            await new Promise(resolve => setTimeout(resolve, 200));
        }
    }

    private makeFrompos(i: number): { x: number, y: number, z: number } {
        const dist = 10;
        // 2πをcountsで一周
        const theta = i * (2 * Math.PI / this.counts);

        // y座標は固定。xはsin、zはcos
        const ret = {
            x: dist * Math.sin(theta),
            y: 1,
            z: dist * Math.cos(theta)
        };
        console.log(ret);
        return ret;
    }

    /**
     * 渡された点から原点との点対称の位置
     */
    private makeTopos(pos: { x: number, y: number, z: number }): { x: number, y: number, z: number } {
        const player = {
            x: 0,
            y: 1,
            z: 0
        }
        const dist = 1; // 突き抜ける距離。1でちょうど反対側
        const ret = {
            x: (player.x - pos.x) * dist,
            y: (player.y - pos.y) * dist,
            z: (player.z - pos.z) * dist,
        };
        return ret;
    }
}
