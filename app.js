// Calculate random number between two numbers
function getRandomValue(min, max) {
    return Math.floor((Math.random() * (max - min))) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        };
    },
    computed: {
        monsterBarLevel() {
            if (this.monsterHealth <= 0) {
                return { width: '0%' };
            }
            return { width: this.monsterHealth + '%' };
        },
        playerBarLevel() {
            if (this.playerHealth <= 0) {
                return { width: '0%' };
            }
            return { width: this.playerHealth + '%' };
        },
        enableSpecialAttackBtn() {
            return this.currentRound % 3 !== 0;
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                // It's a draw
                this.winner = 'draw';
            } else if (value <= 0) {
                // Player lost
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                // It's a draw
                this.winner = 'draw';
            } else if (value <= 0) {
                // Monster lost
                this.winner = 'player';
            }
        }
    },
    methods: {
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.currentRound = 0;
            this.logMessages = [];
        },
        attachTheMonster() {
            this.currentRound++;
            const attackDamage = getRandomValue(5, 15);
            this.monsterHealth -= attackDamage;
            this.addLogMessage('player', 'attack', attackDamage);
            this.attachThePlayer();
        },
        attachThePlayer() {
            const attackDamage = getRandomValue(8, 18);
            this.playerHealth -= attackDamage;
            this.addLogMessage('monster', 'attack', attackDamage);
        },
        specialAttack() {
            this.currentRound++;
            const attackDamage = getRandomValue(10, 20);
            this.monsterHealth -= attackDamage;
            this.addLogMessage('player', 'special-attack', attackDamage);
            this.attachThePlayer();
        },
        healPlayer() {
            this.currentRound++;
            const healValue = getRandomValue(8, 18);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.addLogMessage('player', 'heal', healValue);
            this.attachThePlayer();
        },
        surrender() {
            this.winner = 'monster';
        },
        addLogMessage(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    }
});

app.mount('#game');