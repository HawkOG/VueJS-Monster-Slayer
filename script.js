new Vue({
    el: '#app',
    data: {
        showGameMenu: false,
        name: '',
        playerHP: 100,
        monsterHP: 100,
        actionsMade: [],
    },
    methods: {
        getPlayer: function(){
            let name = prompt('What is your name?')
            this.name = name
            return name
        },
        calculateDamage: function(min, max){
            let damage = Math.max(Math.floor(Math.random() * max + min))
            return damage
        },
        getAttacked: function () {
            let rngEnemy = this.calculateDamage(1,10)
            this.playerHP = this.playerHP -= rngEnemy
            this.actionsMade.unshift({
                isPlayer: false,
                description: `Monster hits You for ${rngEnemy} damage`
            })
            console.log(this.actionsMade);
        },

        action_attack: function () {
            let rngPlayer = this.calculateDamage(1,10)
            this.monsterHP = this.monsterHP - rngPlayer
            this.getAttacked()
            this.actionsMade.unshift({
                isPlayer: true,
                description: `You hit Monster for ${rngPlayer} damage`
            })
            this.checkVictory()
        },

        action_specialAttack: function () {
            let rngPlayer = this.calculateDamage(10,20)
            this.monsterHP = this.monsterHP - rngPlayer
            this.actionsMade.unshift({
                isPlayer: true,
                description: `You hit Monster for ${rngPlayer} damage`
            })
            this.getAttacked()
            this.checkVictory()
        },

        action_heal: function () {
            if (this.playerHP < 80) {
                this.playerHP +=  20
            } else{
                this.playerHP = 100
            }
            
            this.getAttacked()
            this.actionsMade.unshift({
                isPlayer: true,
                description: `Player healed himself for 20 HP`
            })

        },

        action_surrender: function () {
            this.showGameMenu = false
            this.actionsMade = []
            this.playerHP = 100
            this.monsterHP = 100
        },

        checkVictory: function(){
            if (this.monsterHP <= 0) {
                alert('You win!')
            }
            if (this.playerHP <= 0) {
                alert('You lost!')
            }
        }
    }
})