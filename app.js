// Calculate random number between two numbers
function getRandomValue(min, max) {
    return Math.floor((Math.random() * (max - min))) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0
        };
    },
    computed: {
        monsterBarLevel() {
            return { width: this.monsterHealth + '%' };
        },
        playerBarLevel() {
            return { width: this.playerHealth + '%' };
        },
        enableSpecialAttackBtn() {
            return this.currentRound % 3 !== 0;
        }
    },
    methods: {
        attachTheMonster() {
            this.currentRound++;
            const attackDamage = getRandomValue(5, 15);
            this.monsterHealth -= attackDamage;
            this.attachThePlayer();
        },
        attachThePlayer() {
            const attackDamage = getRandomValue(8, 18);
            this.playerHealth -= attackDamage;
        },
        specialAttack() {
            this.currentRound++;
            const attackDamage = getRandomValue(10, 25);
            this.monsterHealth -= attackDamage;
            this.attachThePlayer();
        }
    }
});

app.mount('#game');