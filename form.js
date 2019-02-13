(function (global) {

    let Form = function (options) {
        return new Form.init(options);
    };
    let parentElement;

    Form.init = function (options) {
        let self = this;
        self.validate(options);
        self.init(options);
    };
    Form.prototype = {

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

            //Create Form
            let formElem = document.createElement("form");

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
                    label.classList.add(val.className);

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

                    //Add outer div to form
                    formElem.appendChild(div);
                });

            }
            if (options.buttons && Array.isArray(options.buttons)) {
                options.buttons.forEach(function (item) {
                    let div = document.createElement("div");
                    let button = document.createElement('button');
                    button.innerText = item.value;
                    button.className = item.className;
                    button.onclick = item.onSubmit;
                    div.appendChild(button);
                    formElem.appendChild(div);
                });

            }

            //Get the selected div and append the form to it

            parentElement.appendChild(formElem);

        }


    };

    Form.init.prototype = Form.prototype;
    global.$F = global.Form = Form;

}(window));
