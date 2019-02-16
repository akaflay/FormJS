(function (global) {

    let Form = function (options) {
        return new Form.init(options);
    };
    let parentElement;
    let arrangement = [];
    let formElem;

    Form.init = function (options) {
        let self = this;
        self.validate(options);
        return this;
    };

    let createEachTable = (self, table) => {
        let div = document.createElement("div");
        div.classList.add('each-form-section');
        let label = document.createElement("div");
        label.innerText = table.label || 'Table Label';
        label.className = table.labelClassName;
        div.appendChild(label);
        let htmlTable = document.createElement('table');
        htmlTable.className = table.className;
        let tableHeaderRow = document.createElement('tr');
        table.header.forEach(function (item) {
            let tableHeaderRowTD = document.createElement('th');
            tableHeaderRowTD.innerText = item;
            tableHeaderRow.appendChild(tableHeaderRowTD);
        });
        htmlTable.appendChild(tableHeaderRow);


        table.data.forEach(function (dataList) {
            let tableBodyRow = document.createElement('tr');
            table.header.forEach(function (item) {
                let tableBodyRowTD = document.createElement('td');
                tableBodyRowTD.innerText = dataList[item];
                tableBodyRow.appendChild(tableBodyRowTD);

            });
            tableBodyRow.addEventListener('click', table.onRowClick.bind(null, dataList, tableBodyRow));
            tableBodyRow.className = table.rowClassName;
            htmlTable.appendChild(tableBodyRow);


        });


        div.appendChild(htmlTable);
        self.arrangeElements(table.index, div);

    };

    let createEachButton = (self, button) => {
        let div = document.createElement("div");
        let btn = document.createElement('button');
        btn.innerText = button.value || 'Button';
        btn.className = button.className;
        btn.addEventListener('click', button.onSubmit);
        div.appendChild(btn);
        self.arrangeElements(button.index, div);

    };

    let createEachCheckBoxOrRadioButton = (inputItemDiv,input,item) => {
        let inputItem = document.createElement("input");
        inputItem.name = input.name;
        inputItem.type = input.type;
        inputItem.value = item;
        inputItem.id = item;
        let label = document.createElement('label');
        label.className = input.className;
        label.for = item;
        label.innerText = item;
        inputItemDiv.appendChild(label).appendChild(inputItem);



    };

    let createEachSelectOption=(inputItem,item)=>{
        let itm = document.createElement("option");
        itm.value = item.value;
        itm.innerText = item.label;
        inputItem.appendChild(itm);

    };

    let createEachItem=(inputItemDiv,input)=>{
        let inputItem = document.createElement("input");
        inputItem.className = input.className;
        inputItem.name = input.name;
        inputItemDiv.appendChild(inputItem);

    };

    let createEachInput = (self, input) => {
        //Create outer div
        let div = document.createElement("div");
        div.classList.add("each-form-section");

        //Create Label Div
        let label = document.createElement("div");
        label.innerText = input.label;
        label.classList.add('float-left');
        label.classList.add(input.lableClassName);

        //Create Input div
        let inputItemDiv = document.createElement("div");
        inputItemDiv.class = `float-left`;

        if (input.type === 'text') {
            createEachItem(inputItemDiv,input);

        }

        if (input.type === 'select') {
            if (!input.items || !Array.isArray(input.items)) throw "Please provide proper options for select";
            let inputItem = document.createElement("select");
            inputItem.className = input.className;
            inputItem.name = input.name;
            if (Array.isArray(input.items)) {
                input.items.forEach(function (item) {
                    createEachSelectOption(inputItem,item);

                });
            }
            inputItemDiv.appendChild(inputItem);
        }

        if (input.type === 'checkbox' || input.type === 'radio') {
            if (!input.items || !Array.isArray(input.items)) throw `Please provide proper options for ${input.type}`;
            input.items.forEach(function (item) {
                createEachCheckBoxOrRadioButton(inputItemDiv,input,item);
            });
        }
        //Append label and item div
        div.appendChild(label);
        div.appendChild(inputItemDiv);

        //Add outer div to the arrangment array
        self.arrangeElements(input.index, div);
    };


    Form.prototype = {

        createForm: function () {
            formElem = document.createElement("form");
            return this;
        },

        createHTML: function () {
            if (!formElem) this.createForm();

            if (arrangement.length > 0) {
                arrangement.forEach((item => formElem.appendChild(item)));
            }
            parentElement.appendChild(formElem);

        },

        arrangeElements: function (index, element) {

            if (arrangement[index]) {
                arrangement.push(element);
            } else {
                arrangement[index] = element;
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

        createInput: function (inputs) {
            let self = this;

            //For each input options loop and create inner items
            if (inputs && Array.isArray(inputs)) {

                inputs.forEach(function (val) {
                    createEachInput(self, val);
                });

            }

            return self;

        },
        createTable: function (tables) {
            let self = this;
            if (tables && Array.isArray(tables)) {

                tables.forEach(function (tableItem) {
                    createEachTable(self, tableItem);

                });
            }
            return self;

        },

        createButton: function (buttons) {
            let self = this;
            if (buttons && Array.isArray(buttons)) {

                buttons.forEach(function (item) {
                    createEachButton(self, item);
                });
            }
            return self;

        }

    };

    Form.init.prototype = Form.prototype;
    global.$F = global.Form = Form;

}(window));
