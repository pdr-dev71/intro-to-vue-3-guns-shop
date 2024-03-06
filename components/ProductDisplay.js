app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: /*html*/ `
    <div class="product-display">
      <div class="product-container">
      
        <div class="product-info card">
            <img class="gun-img" v-bind:src="image">
            <div class="cart">
              Carrinho ({{ cart.length }})
            </div>
          <div class="product-details">
          
            <h1>{{ title }} <img class="brand-image" v-bind:src="brand"> </h1>
            
            <div class="description">{{ subtitle }}</div>
            <h3>Especificações Técnicas:</h3>
           
              <p class="uppercase" v-for="(value, key) in details">{{ key }}: {{ value }}</p>
            
            <div class="stock" v-if="inStock">Disponível: {{ inStock }}</div>

            <div v-else class="out-stock">Fora de estoque</div>

            <p>{{ inStock ? 'Frete: ' + (premium ? 'Grátis' : 'Indisponível') : 'Produto fora de estoque' }}</p>
            
            <div v-for="(variant, index) in guns" :key="variant.id" @click="updateVariant(index)" class="color-circle" :style="{ border: '2px solid ' + (selectedCircle === index ? 'green' : '') }">
              <span class="color-circle-span">{{ variant.name }}</span>
            </div>
            
            <button class="add-button" :class="{ disabledButton: !inStock }" :disabled="!inStock" v-on:click="addToCart(guns[selectedVariant].id)">
              Adicionar ao carrinho
            </button>
            
            <button class="remove-button" @click="removeFromCart(guns[selectedVariant].id)">
              Remover do carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
        selectedVariant: 0,
        borderColor: '',
        selectedCircle: 0,
        cart: [],
        
        guns: [
          { 
            id: 1, 
            name: "T10", 
            brand: "./assets/images/brasil_logo.png",
            description: "Aliando tecnologia ao alto padrão de qualidade, a Taurus apresenta o Fuzil T10 20”, que oferece conforto e precisão nos disparos.",
            image: "./assets/images/t10.jpg", 
            quantity: 1,
            technicalSpecifications: {
              calibre: ".308WIN / 7.62x51 NATO",
              funcionamento: "SAFE | SEMI",
              capacidade: "10 ou 20",
            }
          },
          { 
            id: 2, 
            name: "BMF-9", 
            brand: "./assets/images/brasil_logo.png",
            description: "A Taurus recebe mais um integrante da plataforma AR: a Carabina BM-F-9 Brigade. A BM-F-9 Brigade, no calibre 9mm, é excelente para defesa residencial e prática esportiva. ",
            image: "./assets/images/bmf_9.jpg", 
            quantity: 0,
            technicalSpecifications: {
              calibre: "9mm",
              funcionamento: "SAFE | SEMI",
              capacidade: "32 cartuchos",
            }
          },
          { 
            id: 3, 
            name: "KR-9", 
            brand: "./assets/images/brasil_logo.png",
            description: "A Taurus traz a conceituada carabina Kalashnikov KR-9 SBR. No calibre 9mm, é excelente para defesa residencial e prática esportiva.",
            image: "./assets/images/krs_9.jpg", 
            quantity: 2,
            technicalSpecifications: {
              calibre: ".308WIN / 7.62x51 NATO",
              funcionamento: "SAFE | SEMI",
              capacidade: "10 ou 20",
            }
          },
          { 
            id: 4, 
            name: "T4", 
            brand: "./assets/images/brasil_logo.png",
            description: "A consagrada plataforma T4 da Taurus® recebe mais um integrante, o Fuzil T4 300 MLOK - CAL. .300BLK",
            image: "./assets/images/t4_300_blk.jpg", 
            quantity: 0,
            technicalSpecifications: {
              calibre: "300 Blackout",
              funcionamento: "SAFE | SEMI",
              capacidade: "30 cartuchos",
            }
          },
          { 
            id: 5, 
            name: "CT 9", 
            brand: "./assets/images/brasil_logo.png",
            description: "CARABINA CT9, IDEAL PARA O TIRO ESPORTIVO. Carabina semiautomática no calibre 9mm, com capacidade de 30 tiros, mais dois carregadores adicionais de 32 tiros, cano de 16 e teclas ambidestras",
            image: "./assets/images/ct_9.jpeg", 
            quantity: 3,
            technicalSpecifications: {
              calibre: "9x19 mm",
              funcionamento: "Blowback simples",
              capacidade: "30 / 32",
            }
          },
          { 
            id: 6, 
            name: "CTT 40", 
            brand: "./assets/images/brasil_logo.png",
            description: "A TAURUS CTT40 é uma carabina semi-automática, de fácil manejo e ideal para a utilização policial e militar em operações urbanas. É indicada, também, para o tiro esportivo.",
            image: "./assets/images/ctt_40.jpg", 
            quantity: 1,
            technicalSpecifications: {
              calibre: "40 S&W",
              funcionamento: "Blowback simples",
              capacidade: "30 cartuchos",
            }
          },
          { 
            id: 7, 
            name: "SMT 9", 
            brand: "./assets/images/brasil_logo.png",
            description: "As submetralhadoras Taurus são armas leves, de fácil manejo e confortáveis para o uso. Ideais para o uso em policial em operações urbanas, aliam ostensividade e versatilidade.",
            image: "./assets/images/smt_9.jpg", 
            quantity: 1,
            technicalSpecifications: {
              calibre: "9x19mm",
              funcionamento: "Blowback",
              capacidade: "30 cartuchos",
            }
          },
          { 
            id: 8, 
            name: "T4/M16", 
            brand: "./assets/images/brasil_logo.png",
            description: "O Fuzil T4 11,5 é baseado na consagrada plataforma M4/M16, amplamente empregada pelas forças militares em todo mundo.",
            image: "./assets/images/t4_m16.png", 
            quantity: 0,
            technicalSpecifications: {
              calibre: "5,56 NATO",
              funcionamento: "SAFE | SEMI | AUTO (Conforme legislação vigente)",
              capacidade: "30 cartuchos",
            }
          },
          { 
            id: 9, 
            name: "T4 RIS", 
            brand: "./assets/images/brasil_logo.png",
            description: "O Fuzil T4 é considerado uma arma extremamente confiável, leve, de fácil emprego e manutenção.",
            image: "./assets/images/t4_ris.png", 
            quantity: 2,
            technicalSpecifications: {
              calibre: "5,56 NATO",
              funcionamento: "SAFE | SEMI | AUTO (Conforme legislação vigente)",
              capacidade: "30 cartuchos",
            }
          },
         
        ]
    }
  },
  methods: {
      updateVariant(index) {
          this.selectedVariant = index
          this.selectedCircle = index;
        
      },
      addToCart(id) {
        this.cart.push(id);
     
      },
      removeFromCart(id) {
        const index = this.cart.indexOf(id);
        if (index > -1) {
            this.cart.splice(index, 1);
        }
      },
     
      
      
  },
  computed: {
      title() {
          return this.guns[this.selectedVariant].name
      },
      subtitle() {
        return this.guns[this.selectedVariant].description
      },
      brand() {
        return this.guns[this.selectedVariant].brand
      },
      details() {
        return this.guns[this.selectedVariant].technicalSpecifications
      },
      image() {
          return this.guns[this.selectedVariant].image
      },
      inStock() {
          return this.guns[this.selectedVariant].quantity
      },
      shipping() {
        if (this.premium) {
          return "Grátis"
        }
        return "Indísponível"
      }
  }
})