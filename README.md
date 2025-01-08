<!-- Languages options -->
[![Static Badge](https://img.shields.io/badge/lang-en_%F0%9F%87%BA%F0%9F%87%B8-blue?style=for-the-badge&logo=%F0%9F%87%BA%F0%9F%87%B8&logoSize=auto&link=https%3A%2F%2Fgithub.com%2FAdrianoLMRS%2FPousada-TAO%2Fblob%2Fmain%2F.github%2FREADME.en.md)](https://github.com/AdrianoLMRS/Pousada-TAO/blob/main/.github/README.en.md#pousada-tao)&emsp;&emsp;[![Static Badge](https://img.shields.io/badge/lang-pt--BR_%F0%9F%87%A7%F0%9F%87%B7-lightgreen?style=for-the-badge&logo=%F0%9F%87%A7%F0%9F%87%B7&logoSize=auto&link=https%3A%2F%2Fgithub.com%2FAdrianoLMRS%2FPousada-TAO%3Ftab%3Dreadme-ov-file%23readme)](https://github.com/AdrianoLMRS/Pousada-TAO?tab=readme-ov-file#pousada-tao)

---

# Pousada TAO
[Pousada TAO](https://github.com/AdrianoLMRS/Pousada-TAO "Pousada TAO") é uma Web app de uma Pousada real em [Campos do Jordão](http://https://www.google.com/maps?ll=-22.73301,-45.58613&z=13&t=m&hl=pt-BR&gl=BR&mapclient=embed&q=Campos+do+Jord%C3%A3o+SP+12460-000 "Campos do Jordão")<br>Acesse o Website [aqui](https://pousada-tao.onrender.com/ "aqui") <br><br><br><br>
## Funcionalidades

- Reservas online com pagamento direto pelo site via [Stripe](https://www.nerdwallet.com/article/small-business/what-is-stripe).
- Confirmação automática após reserva por E-mail e SMS.
- Autenticação de usuário utilizando JWT & Cookies.
- Mecanismo de login após reserva.
- Gerenciamento eficiente das reservas utilizando MongoDB como banco de dados.
- Interface responsiva e intuitiva desenvolvida com HTML, CSS e JavaScript puro. <br><br><br>

## Stack
- **Frontend:** HTML, CSS, JavaScript (puro).
- **Backend:** Node.js, Express.js.
- **Banco de Dados:** MongoDB com Mongoose ([MongoDB Atlas](https://www.mongodb.com/resources/products/platform/mongodb-atlas-tutorial)).
- **Deploy:** Docker hopedado no [Render](https://render.com/about).
- **Pagamentos:** [Stripe](https://www.nerdwallet.com/article/small-business/what-is-stripe).<div>
- <details>
  <summary><strong>Mensagens</strong></summary>
  
  - **Email:** Nodemailer  
  - **SMS:** Twilio (desativado por enquanto 😭)
</details>

- <details>
  <summary><strong>API's</strong></summary>

  - **Stripe**  
  - **Auth0 com MongoDB** (desativado pois não é mais necessário [Commit](https://github.com/AdrianoLMRS/Website/commit/961443c099e786a387a5444cd0e4d5208955daaf), [Issue](https://github.com/AdrianoLMRS/Website/issues/6))
</details></div>

- MVC (Model View Controller) design pattern.
- All the code was written by me (no templates).
<br><br><br>

## Demo
Acesse a aplicação em produção:
[🔗 Pousada TAO - Campos do Jordão](https://pousada-tao.onrender.com/)
<br><br><br>

## Rode localmente
**Cerca de 2 minutos* 🕒

### Dependências :
- **node.js** &nbsp;>= &nbsp;v18.19.1&emsp;([Instale aqui](https://nodejs.org/en/download/package-manager))
<br>

#### De uma vez :
<br>

-  **Código inteiro:**  
```
git clone https://github.com/AdrianoLMRS/Pousada-TAO  # Clona o repositório
cd Pousada-TAO  # Navegua até a pasta
npm run local  # Instala as dependências
npm start # Inicia o servidor no http://localhost:3000
```
<br>

- **Vá para o link:**&nbsp;[Local:host](http://localhost:3000) (Porta 3000)
<br>

#### Passo à passo :
<br>

1.  **Clone o repositório:**&emsp;`git clone https://github.com/AdrianoLMRS/Pousada-TAO`
<br>

2. **Navegue até a pasta:**&emsp;`cd Pousada-TAO`
<br>

3. **Instale as dependências:**&emsp;`npm run local`
<br>

4. **Execute o programa:**&emsp;`npm start`
<br>

5. **Vá para o link:**&nbsp;[Localhost](http://localhost:3000) (Porta 3000)
<br>


<br><br>

---
<br>

## Contato

- **✉ Email:** adriano.lmrs1@gmail.com
- **🕻 Telefone:** +55 12 99732-1039
- **<img width="14" height="14"  src="https://img.icons8.com/fluency-systems-filled/50/whatsapp.png" alt="whatsapp-icon"/> WhatsApp:** [Clique aqui para conversar](https://wa.me/5512997321039)
- **<img width="14" height="14" src="https://img.icons8.com/material-outlined/14/github.png" alt="github-icon"/> Github:** [AdrianoLMRS](https://github.com/AdrianoLMRS)
<br><br><br>

## Licença
<br>

MIT License com cláusulas adicionais.  [Veja aqui](https://github.com/AdrianoLMRS/Pousada-TAO/tree/main?tab=License-1-ov-file#readme)
