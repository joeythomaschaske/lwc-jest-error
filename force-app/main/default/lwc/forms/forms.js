import { api } from 'lwc';

const Selectors = Symbol('Selectors');

const ValidationMixin = (baseClass) =>
    class extends baseClass {
        [Selectors] = [];

        @api
        checkValidity() {
            let valid = true;

            this.forEach((input) => {
                valid = input.checkValidity() && valid;
            });

            return valid;
        }

        @api
        reportValidity() {
            let valid = true;

            this.forEach((input) => {
                valid = input.reportValidity() && valid;
            });

            return valid;
        }

        @api
        showHelpMessageIfInvalid() {
            this.forEach((input) => {
                input.showHelpMessageIfInvalid();
            });
        }

        @api
        setCustomValidity(message) {
            this.forEach((input) => {
                if (input.setCustomValidity) {
                    input.setCustomValidity(message);
                }
            });
        }

        forEach(eachFn) {
            this[Selectors].forEach((selector) => {
                const inputs = this.template.querySelectorAll(selector);

                Array.prototype.forEach.call(inputs, eachFn);
            });
        }
    };

ValidationMixin.Selectors = Selectors;

export { ValidationMixin };
