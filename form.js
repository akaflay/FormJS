(function (global) {

    let Form = function (options) {
        return new Form.init(options);
    };
    let parentElement;
    let arrangment=[];

    Form.init = function (options) {
        let self = this;
        self.validate(options);
        self.init(options);
        self.createHTML();
    };
    Form.prototype = {

        createHTML:function(){
            //Create Form
            let formElem = document.createElement("form");
            if(arrangment.length>0){
                arrangment.forEach(item=>formElem.appendChild(item));
            }
            parentElement.appendChild(formElem);

        },
        addElementToArrangment:function(index,element){

            if(arrangment[index]){
                arrangment.push(element);
            }else{
                arrangment[index]=element;
            }
        },

        validate: function (options) {
            if (!options.selector)
                throw "Invalid Selector";
            let idSelector = document.getElementById(options.selector);
            if (idSelector) parentElement = idSelector;
            else {
                let clasSselector = document.getElementsByClassName(options.selector);
                if (clasSselector) parentElement = clasSselector;
                else throw "Provide Selecter with either class or id";
            }

        },

        init: function (options) {
            let self=this;

            //For each input options loop and create inner items
            if (Array.isArray(options.input)) {

                options.input.forEach(function (val) {


                    //Create outer div
                    let div = document.createElement("div");
                    div.classList.add("each-form-section");

                    //Create Label Div
                    let label = document.createElement("div");
                    label.innerText = val.label;
                    label.classList.add('float-left');
                    label.classList.add(val.lableClassName);

                    //Create Input div
                    let inputItemDiv = document.createElement("div");
                    inputItemDiv.class = `float-left`;
                    if (val.type === 'text') {
                        let inputItem = document.createElement("input");
                        inputItem.className = val.className;
                        inputItem.name = val.name;
                        inputItemDiv.appendChild(inputItem);

                    }
                    if (val.type === 'select') {
                        let inputItem = document.createElement("select");
                        inputItem.className = val.className;
                        inputItem.name = val.name;
                        if (Array.isArray(val.items)) {
                            val.items.forEach(function (item) {
                                let itm = document.createElement("option");
                                itm.value = item.value;
                                itm.innerText = item.label;
                                inputItem.appendChild(itm);
                            });
                        }

                        inputItemDiv.appendChild(inputItem);

                    }

                    if (val.type === 'checkbox' || val.type === 'radio') {
                        if (Array.isArray(val.items)) {
                            val.items.forEach(function (item) {

                                let inputItem = document.createElement("input");
                                inputItem.name = val.name;
                                inputItem.type = val.type;
                                inputItem.value = item;
                                inputItem.id = item;
                                let label = document.createElement('label');
                                label.for = item;
                                label.innerText = item;
                                inputItemDiv.appendChild(label).appendChild(inputItem);
                            });

                        }
                    }
                    //Append label and item div
                    div.appendChild(label);
                    div.appendChild(inputItemDiv);

                    //Add outer div to the arrangment array
                    self.addElementToArrangment(val.index,div);
                });

            }
            if (options.buttons && Array.isArray(options.buttons)) {
                this.createButton(options.buttons);

            }

            if (options.tables && Array.isArray(options.tables)) {
                this.createTable(options.tables);

            }



        },
        createTable:function(table){
            let self=this;

            table.forEach(function (tableItem) {
                let div = document.createElement("div");
                div.classList.add('each-form-section');
                let label=document.createElement("div");
                label.innerText=tableItem.label;
                label.className=tableItem.labelClassName;
                div.appendChild(label);
                let htmlTable = document.createElement('table');
                htmlTable.className=tableItem.className;
                let tableHeaderRow=document.createElement('tr');
                tableItem.header.forEach(function (item) {
                        let tableHeaderRowTD=document.createElement('th');
                        tableHeaderRowTD.innerText=item;
                        tableHeaderRow.appendChild(tableHeaderRowTD) ;
                    });
                htmlTable.appendChild(tableHeaderRow);



                tableItem.data.forEach(function (dataList) {
                    let tableBodyRow=document.createElement('tr');
                    tableItem.header.forEach(function(item){
                        let tableBodyRowTD=document.createElement('td');
                        tableBodyRowTD.innerText=dataList[item];
                        tableBodyRow.appendChild(tableBodyRowTD) ;

                    });
                    tableBodyRow.onclick=tableItem.onClick.bind(null,dataList,tableBodyRow);
                    tableBodyRow.className=tableItem.rowClassName;
                    htmlTable.appendChild(tableBodyRow);


                });


                div.appendChild(htmlTable);
                self.addElementToArrangment(tableItem.index,div);
            });

        },

        createButton:function(buttons){
            let self=this;
            buttons.forEach(function (item) {
                let div = document.createElement("div");
                let button = document.createElement('button');
                button.innerText = item.value;
                button.className = item.className;
                button.onclick = item.onSubmit;
                div.appendChild(button);
                self.addElementToArrangment(item.index,div);
            });

        }




    };

    Form.init.prototype = Form.prototype;
    global.$F = global.Form = Form;

}(window));
