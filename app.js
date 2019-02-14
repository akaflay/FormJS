let tableRowSelected;
$F({
    selector: "txt",
    input: [
        {name: 'path', type: 'text', className: '', label: 'Path to private build or Jenkins build',index:0,lableClassName:'bold'},
        {name: 'installLatest', type: 'select', className: '', label: 'Or Install Latest',index:1,lableClassName:'bold',
            items: [
                    {value: 'default', label: 'Default'},
                    {value: 'rel-daytona', label: 'Rel Daytona'},
                    {value: 'rel-emerald', label: 'Rel Emerald'},
                    {value: 'rel-fiji', label: 'Rel Fiji'}
                    ]
        },
        {name: 'testToRun', type: 'radio', className: 'bold', label: 'Test to run (Pick one option below) ',index:2,lableClassName:'bold',
            items: [
                    'Vdbench_Dedupe_Off',
                    'Vdbench_Dedupe_Ratio_1',
                    'Vdbench_Dedupe_Ratio_2'
                    ]
        },
        {
            name: 'otherOptions', type: 'checkbox', className: 'bold', label: 'Other options (Optional) ',index:3,lableClassName:'bold',
            items: [
                    'Collect Details Stats',
                    'Encryption'
                    ]
        }

    ],

    buttons: [{
        index:5,
        value: 'Submit', className: 'btn bold', onSubmit: function (e) {
            e.preventDefault();
            let path = document.getElementsByName("path");
            let installLatest = document.getElementsByName("installLatest");
            let testRunSelected;
            let testToRun = document.getElementsByName("testToRun");
            if (testToRun) {
                for (let checkbox of testToRun) {
                    if (checkbox.checked) testRunSelected = checkbox.value;
                }

            }
            let otherOptions = document.getElementsByName("otherOptions");
            let otherOptionSelected;
            if (otherOptions) {
                for (let checkbox of otherOptions) {
                    if (checkbox.checked) otherOptionSelected = checkbox.value;
                }

            }


            let msg = `Options selected path ${path[0].value?path[0].value:installLatest[0].value} and test to run ${testRunSelected} and other option is ${otherOptionSelected} and the table item selected ${JSON.stringify(tableRowSelected)}`;
            let result = document.getElementById("result");
            result.innerText = msg;
            //Yaha you have to make the call to the server
        }
    }],

    tables:[{
        label:'This is a table label',
        index:4,
        className:'table',
        labelClassName:'bold',
        rowClassName:'house-hover',
        header:["id","value"],
        data:[{id:"1",value:'Angad'},{id:"2",value:"Nutan"},{id:"3",value:"Niveeta"}],
        onRowClick:function (row,object) {
            tableRowSelected=row;
            let tables = document.getElementsByClassName("table");
            for(let eachTable=0;eachTable<tables.length;eachTable++){
                let tbl=tables[eachTable];
                for(let i=0;i<tbl.rows.length;i++){
                    tbl.rows[i].removeAttribute('class');
                    tbl.rows[i].setAttribute('class','house-hover');
                }
            }

            object.classList.add('active');
            console.log(tableRowSelected);
        }

    }]
});
