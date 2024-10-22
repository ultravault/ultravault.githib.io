var app = new Vue({
    el: '#app',
    data: {
        vaultNumber: null,
        apiUrl: 'https://cldshp.cc/api/vaults/verify/',
        profile: [],
        vault: [],
        address: [],
        errorMessage: null,
    },
    methods: {
        submitForm () {
            if(this.validateForm()) {
                this.processForm();
            } else {
                document.getElementById('error').className = 'block text-red-700 mb-6 tracking-widest'
                document.getElementById('error').innerHTML = 'Vault number or Security code required';
            }

        },

        validateForm () {
           if (this.vaultNumber) {
               return true;
           }
        },

        processForm () {
            document.getElementById('loading').className = 'block tracking-widest text-green-700 mb-6';
            document.getElementById('error').className = 'hidden';

            // console.log(this.apiUrl  + this.vaultNumber)
            
            axios.get(this.apiUrl + this.vaultNumber)
            
                .then((res) => {

                    document.getElementById('loading').className = 'hidden';


                    // console.log(res.data)

                    if(!res.success) {
                        this.errorMessage = res.data.message
                        document.getElementById('error').className = 'block text-red-700 mb-6 tracking-widest'
                        document.getElementById('error').innerHTML = this.errorMessage

                    } 
                    
                    if(res.data.success) {

                        // console.log('success')

                        this.profile = res.data.data.profile;
                        this.vault = res.data.data.vault;
                        this.address = res.data.data.address;

                        // console.log(res);

                        // document.getElementById('error').className = 'hidden'
                    
                        document.getElementById('error').className = 'block text-green-700 mb-6 tracking-widest'
                        document.getElementById('error').innerHTML = 'Code successfully checked. You are been redirected.'

                        setTimeout(function () {
                            
                            document.getElementById('login-form').className = 'hidden'
                            
                            document.getElementById('result-container').className = 'block'
                        
                        }, 4000);
                    }

                
            })
            .catch(function (err) {
                console.log(err)
            })
            .then(function () {
              // always executed
            });

            // return false
        }

    }
});
