// Calculate random number between two numbers
function getRandomValue(min, max) {
    return Math.floor((Math.random() * (max - min))) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
        };
    },
    computed: {
        monsterBarLevel() {
            return { width: this.monsterHealth + '%' };
        },
        playerBarLevel() {
            return { width: this.playerHealth + '%' };
        }
    },
    methods: {
        attachTheMonster() {
            const attackDamage = getRandomValue(5, 15);
            this.monsterHealth -= attackDamage;
            this.attachThePlayer();
        },
        attachThePlayer() {
            const attackDamage = getRandomValue(8, 18);
            this.playerHealth -= attackDamage;
        }
    }
});

app.mount('#game');