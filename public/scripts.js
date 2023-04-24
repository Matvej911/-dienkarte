class DatoraDetala {
    constructor(nosaukums, apraksts, cena) {
        
        this.validetDetalasDatus(nosaukums, apraksts, cena)

   
        this.nosaukums = nosaukums
        this.apraksts = apraksts
        this.cena = cena
    }

    apskatitDetalu() {
        
        return {
            nosaukums: this.nosaukums,
            apraksts: this.apraksts,
            cena: this.cena,
        }
    }

    labotDetalu (nosaukums, apraksts, cena) {
        
        this.validetDetalasDatus(nosaukums, apraksts, cena)

       
        this.nosaukums = nosaukums
        this.apraksts = apraksts
        this.cena = cena
    }

    
    validetDetalasDatus (nosaukums, apraksts, cena) {
        if (nosaukums === undefined || apraksts === undefined || cena === undefined) {
            throw Error('Nav padota visa nepieciešamā informācija!')
        }
    }

}


class DatoraDetalasFormas {
    constructor(addFormSelector, partWrapperSelector) {
        
        this.addFormElement = document.querySelector(addFormSelector)
        
        this.partWrapperElement = document.querySelector(partWrapperSelector)
        
        this.allParts = [
            
            new DatoraDetala("Risotto" ,'Makaroni ar sieru', 6.50)
        ]

       
        this.init()
    }

    init() {
        
        this.addAllPartHtml()
        
        this.addSubmitHandler()
        
        this.addEditHandlers()
    }

    
    tableRefresh() {
        this.addAllPartHtml()
        this.addEditHandlers()
    }

    addSubmitHandler() {
        
        this.addFormElement.addEventListener('submit', (eventObject) => {
            
            eventObject.preventDefault()

            const formData = this.getFormData(this.addFormElement)

            const newPart = new DatoraDetala(
                formData.nosaukums, 
                formData.apraksts,
                formData.cena
            )

            
            this.allParts.push(newPart)
        
            
            alert('Ēdiens ir pievienots')
                        this.tableRefresh()

          
            this.addFormElement.reset()
        })
    }

    addAllPartHtml() {
        
        let finalHTML = ""

        
        this.allParts.forEach((part) => {
            finalHTML += this.getPartHtmlCode(part)
        })

       
        this.partWrapperElement.innerHTML = finalHTML
    }

    addEditHandlers() {
        
        callEditForms = this.partWrapperElement.querySelectorAll('.js-edit');

        
        allEditForms.forEach((form, index) => {
            form.addEventListener('submit', (eventObject) => {
                
                eventObject.preventDefault();

                
                const updatedData = this.getFormData(form)

              
                this.allParts[index].labotDetalu(updatedData.nosaukums, updatedData.apraksts, updatedData.cena)
                
                alert('Detaļa ir atjaunināta')

               
                this.tableRefresh()
            })
        })

    }

   
    getFormData(form) {
        const formData = new FormData(form);

        return {
            nosaukums:  formData.get('nosaukums'), 
            apraksts: formData.get('apraksts'), 
            cena: formData.get('cena')
        }
    }

   
    getPartHtmlCode(part) {
        return `<form class="js-edit">
        <table class="table table-striped m-0 table-primary">
            <tbody>
                <tr>
                <td valign="middle" style="width: 25%;">
                    <input 
                        type="text" 
                        name="nosaukums" 
                        value="${part.nosaukums}"
                        placeholder="Risotto" 
                        class="form-control"
                        required
                    >
                </td>
                <td valign="middle" style="width: 25%;">
                    <input 
                        type="text" 
                        name="apraksts" 
                        value="${part.apraksts}"
                        class="form-control"
                        required
                        placeholder="Makaroni ar sieru" 
                    >
                </td>
                <td valign="middle" style="width: 25%;">
                    <input 
                        type="number" 
                        name="cena" 
                        value="${part.cena}"
                        class="form-control"
                        placeholder="6,50" 
                        required
                    >
                
                </tr>
            </tbody>
        </table>
    </form>`
    }
}


const datoruDetalasDarbibas = new DatoraDetalasFormas('.js-add-form', '.js-part-wrapper')