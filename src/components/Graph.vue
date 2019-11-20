<template>
    <div class="md-layout">
        <div class="md-layout-item">
            <md-card>
                <md-card-header>
                    <p class="md-title">Data</p>
                </md-card-header>
                <md-table>
                    <md-table-row>
                        <md-table-head v-for="label in labels" :key="label">
                            {{ label }}
                        </md-table-head>
                        <md-table-head>
                            prediction
                        </md-table-head>
                    </md-table-row>
                    <md-table-row v-for="(input, index) in inputs" :key="index">
                        <md-table-cell v-for="label in labels" :key="label + index">
                            {{ input[label] }}
                        </md-table-cell>
                        <md-table-cell :class="{ isCorrect: predictions[index] == inputs[index].growth }">
                            <em>{{ predictions[index] }}</em>
                        </md-table-cell>
                    </md-table-row>
                </md-table>
            </md-card>
        </div>

        <div class="md-layout-item">

            <md-card>
                <md-card-header>
                    <p class="md-title">Quality of prediction</p>
                </md-card-header>
                <md-card-content> 
                    {{ predictionQuality }}%
                </md-card-content>
            </md-card>

            <md-card>
                <md-card-header>
                    <p class="md-title">Weights</p>
                </md-card-header>
                <md-card-content> 
                    <div>
                        <label for="input_a">a</label>
                        <input type="range" min="-1" max="1" step="0.1" v-model="a">
                        {{ a }}
                    </div>
                    <div>
                        <label for="input_b">b</label>
                        <input type="range" min="-1" max="1" step="0.1" v-model="b">
                        {{ b }}
                    </div>
                    <div>
                        <label for="input_c">c</label>
                        <input type="range" min="-1" max="1" step="0.1" v-model="c">
                        {{ c }}
                    </div>
                    <div>
                        <label for="input_d">d</label>
                        <input type="range" min="-1" max="1" step="0.1" v-model="d">
                        {{ d }}
                    </div>
                </md-card-content>
            </md-card>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Graph',
    data: function() {
        return {
            inputs:  [
                {
                    water: true,
                    light: true,
                    music: true,
                    growth: true
                },
                {
                    water: true,
                    light: true,
                    music: false,
                    growth: true
                },
                {
                    water: true,
                    light: false,
                    music: true,
                    growth: false
                },
                {
                    water: true,
                    light: false,
                    music: false,
                    growth: false
                },
                {
                    water: false,
                    light: true,
                    music: true,
                    growth: false
                },
                {
                    water: false,
                    light: true,
                    music: false,
                    growth: false
                },
                {
                    water: false,
                    light: false,
                    music: false,
                    growth: false
                }
            ],
            a: 0,
            b: 0,
            c: 0,
            d: 0
        }
    },
    computed: {
        labels: function() {
            return Object.keys(this.inputs[0])
        },
        predictions: function() {
            let predictions = []
            for (let i of this.inputs) {
                predictions.push( predict( i.water, i.light, i.music, this.a, this.b, this.c, this.d ))
            }
            return predictions
        },
        predictionQuality: function() {
            let numberOfCorrectPredictions = 0
            for (let i = 0; i < this.inputs.length; i++) {
                if ( this.inputs[i].growth == this.predictions[i] ) {
                    numberOfCorrectPredictions++
                }
            }
            let quality = numberOfCorrectPredictions / this.inputs.length
            return Math.ceil(quality * 100) 
        }
    }
}

function predict(w, l, m, a, b, c, d) {
    return a * w + b * l + c * l + d * m > 0.5
}
</script>

<style scoped>
    .isCorrect {
        font-weight: bold;
    }
</style>