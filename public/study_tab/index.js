const Final_Answers = {}

var Submitted = false
var Corrects = 0
var Totals = 0

var interpretation = {
    "choice": {
        "__init__": (position, tb_filled) => {

            const question = tb_filled.question
            const choices = tb_filled.extra_args.choices

            const f = () => {
                let fnStr = "<td>"
                let index = 0
                let question_group = `choice_q${position}`

                choices.forEach((choice) => {
                    let k = `${question_group}num${index}`
                    fnStr += ` 
                        <button id=${k} style="color: black"> Not Selected </button> 
                        <span class=${question_group}>${choice} | </span>`
                    index += 1
                })

                return fnStr + "</td>"
            }

            return `<tr>
                <td>${question}</td>
            </tr>
                ${f()}<br><br>
            `
        },
        "__true_implement__": (position) => {

            let question_group = `choice_q${position}`
            let collection = document.getElementsByClassName(question_group)

            for (let ll = 0; ll < collection.length; ll++){
                        
                let SelfKey = `${question_group}num${ll}`

                // console.log(SelfKey, document.getElementById(SelfKey))
                
                document.getElementById(SelfKey).addEventListener("click", () => {
                            
                    let Ans = Final_Answers[position]
                            //

                    if (Ans && Ans["index"] !== ll){ 
                        document.getElementById(Ans["indexKey"]).innerText = " Not Selected "
                    } 

                    Final_Answers[position] = {
                        "indexKey": SelfKey,
                        "index": ll
                    }
                    document.getElementById(SelfKey).innerText = " Selected! "
                            
                }, true)

            }
        },
        "answer_check": (index, tb_filled) => { 

            const ext_args = tb_filled.extra_args
            let correct_answers = ext_args.correct_answer

            //
            if (!Array.isArray(correct_answers)){ 
                correct_answers = [correct_answers] 
            }
            //

            let Correct = false
            let Ans = (Final_Answers[index] || {"index": null})["index"]

            for (i = 0; i < correct_answers.length; i++){

                let correct_answer = correct_answers[i]

                if (Ans === correct_answer){
                    Correct = true

                }

            }

            if (Correct){ Corrects += 1 }
            document.getElementById("study_tab").innerHTML += `Question ${Number(index) + 1} ${(Correct && "Correct!" || "Wrong.")}<br>`

            
        }

    }
}

var possible_req_calls = {
    "test_1": [
        {
            "type": "choice",
            "question": "Who am I?",
            "extra_args": {
                "choices": [
                    "Who are we*", 
                    "I have no idea either.",
                ],
                "correct_answer": 0
            },
        },

        {
            "type": "choice",
            "question": "Let's start with a simple Biology question: What is the mitochondria?",
            "extra_args": {
                "choices": [
                    "The walls of the cell", 
                    "The powerhouse of the cell",
                    "The engine for my horse to run",
                ],
                "correct_answer": 1
            },
        },

        {
            "type": "choice",
            "question": "Let's play a little game, shall we?",
            "extra_args": {
                "choices": [
                    "Yes", 
                    "Yes"
                ],
                "correct_answer": [0, 1]
            },
        },

        {
            "type": "choice",
            "question": "What is CaseCode?",
            "extra_args": {
                "choices": [
                    "A code breaking competition",
                    "a coding competition",
                    "A case breaking competiton",
                    "a vase breaking competition!"
                ],
                "correct_answer": 1
            },
        },
    ],
    
}

const test = possible_req_calls["test_1"]
const study_tab = document.getElementById("study_tab")

Totals = test.length

for (cyc = 0; cyc < 2; cyc++){
        
    for (Index = 0; Index < test.length; Index++){

        const Question = test[Index]
        const qType = interpretation[ Question.type ]

        if (cyc === 0) {
            //
            const Thing = qType.__init__(Index, Question)
            study_tab.innerHTML += Thing
            //
        } else {
            qType.__true_implement__(Index)
        }
    }

}

document.getElementById("submit").addEventListener("click", () => {

    if (Submitted){ return }
    Submitted = true

    for (let answerInd = 0; answerInd < Totals; answerInd++){

        const ind = test[answerInd]
        const type = ind.type

        interpretation[type].answer_check(answerInd, ind)
    }
    study_tab.innerHTML += `<p>Test over. ${Corrects}/${Totals}, or ${Corrects/Totals * 100}%.</p>`

})