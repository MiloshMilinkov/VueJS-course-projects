function getRandomValue(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
          playerHealth: 100,
          monsterHealth: 100,
          winner: null,
          logMessages: [],
          playerMana: [1,2,3,4]
        };
    },
    computed:{
        monsterBarStyles(){
            if(this.monsterHealth < 0){
                return {width: '0%'}
            }
            return {width: this.monsterHealth +'%'}
        },
        playerBarStyles(){
            if(this.playerHealth < 0){
                return {width: '0%'}
            }
            return {width: this.playerHealth +'%'}
        },
        mayUseSpecialAttack(){
            return this.playerMana.length === 0;
        }
    },
    watch:{
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
                this.winner = 'draw';
            }
            else if (value <= 0){
                this.winner = 'monster';
            }
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0){
                this.winner = 'draw';
            }
            else if (value <= 0){
                this.winner = 'player';
            }
        }
    },
    methods: {
        attackMonster(){
            const attackValue = getRandomValue(5,12);
            this.monsterHealth = this.monsterHealth - attackValue;
            this.addLogMesssage('player', 'attack', attackValue);
            this.attackPlayer();
        },
        attackPlayer(){
            const attackValue = getRandomValue(7,14);
            this.playerHealth = this.playerHealth - attackValue;
            this.addLogMesssage('monster', 'attack', attackValue);
        },
        specialAttackMonster(){
            this.playerMana.splice(-1);
            const attackValue = getRandomValue(10,25);
            this.monsterHealth = this.monsterHealth - attackValue;
            this.addLogMesssage('player', 'attack', attackValue);
            this.attackPlayer();
        },
        healPlayer(){
            this.playerMana.splice(-1);
            const healValue = getRandomValue(10,20);
            if(this.playerHealth + healValue > 100)
                this.playerHealth = 100;
            else
                this.playerHealth = this.playerHealth + healValue;
                this.addLogMesssage('player', 'heal', healValue);
            this.attackPlayer();
        },
        startGame(){
            this.playerHealth = 100,
            this.monsterHealth =100,
            this.winner = null,
            this.logMessages = [],
            this.playerMana = [1,2,3]
        },
        surrender(){
            this.winner = 'monster';
        },
        addLogMesssage(who, what, value){
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    },
});

app.mount("#game")