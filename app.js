var f = $F({
    selector: "txt", input: [
        {name: 'path', type: 'text', className: 'bold', label: 'Path to private build or Jenkins build'},
        {
            name: 'installLatest', type: 'select', className: 'bold', label: 'Or Install Latest',
            items: [{value: 'default', label: 'Default'}, {value: 'rel-daytona', label: 'Rel Daytona'},
                {value: 'rel-emerald', label: 'Rel Emerald'}, {value: 'rel-fiji', label: 'Rel Fiji'}]
        },
        {
            name: 'testToRun', type: 'radio', className: 'bold', label: 'Test to run (Pick one option below) ',
            items: ['Vdbench_Dedupe_Off', 'Vdbench_Dedupe_Ratio_1', 'Vdbench_Dedupe_Ratio_2']
        },
        {
            name: 'otherOptions', type: 'checkbox', className: 'bold', label: 'Other options (Optional) ',
            items: ['Collect Details Stats', 'Encryption']
        }

    ],

    buttons: [{
        value: 'Submit', className: 'btn bold', onSubmit: function (e) {
            e.preventDefault();
            let path = document.getElementsByName("path");
            let installLatest = document.getElementsByName("installLatest");
            let testToRun = document.getElementsByName("testToRun");
            let otherOptions = document.getElementsByName("otherOptions");
            let otherOptionSelected;
            if (otherOptions) {
                for (let checkbox of otherOptions) {
                    if (checkbox.checked) otherOptionSelected = checkbox.value;
                }

            }
            let msg = `Options selected path ${path[0].value} install latest ${installLatest[0].value} and test to run ${testToRun[0].value} and other option is ${otherOptionSelected}`;
            let result = document.getElementById("result");
            result.innerText = msg;
            //Yaha you have to make the call to the server
        }
    }]
});