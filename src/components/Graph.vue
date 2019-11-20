<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th v-for="label in labels" :key="label">
                        {{ label }}
                    </th>
                    <th>
                        prediction
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(input, index) in inputs" :key="index">
                    <td v-for="label in labels" :key="label + index">
                        {{ input[label] }}
                    </td>
                    <td :class="{ isCorrect: predictions[index] == inputs[index].growth }">
                        {{ predictions[index] }}
                    </td>
                </tr>
            </tbody>
        </table>

        <div id="evaluation">
            Quality of prediction: {{ predictionQuality }}%
        </div>

        <div id="weights">
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