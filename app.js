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
    methods: {
        attachTheMonster() {
            this.monsterHealth -= getRandomValue(5, 15);
            this.attachThePlayer();
        },
        attachThePlayer() {
            this.playerHealth -= getRandomValue(5, 18);
        }
    }
});

app.mount('#game');