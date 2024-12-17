<style>
    /* Details */
    .stack-details {  cursor: pointer;  }
    .stack-details summary::-webkit-details-marker,
    .stack-details summary::marker {
        display: none;
        content: '';
    }
    .stack-details summary::after {
        content: '▶';
        display: inline-block;
        position: relative;
        top: -0.05rem;
        font-size: 0.8rem;
        transition: transform 300ms ease-in-out;
    }
    .stack-details[open] summary::after {  transform: rotate(90deg);   }
</style>

# Pousada TAO
[Pousada TAO](https://pousada-tao.onrender.com/ "Pousada TAO") é uma Web app de uma Pousada real em [Campos do Jordão](http://https://www.google.com/maps?ll=-22.73301,-45.58613&z=13&t=m&hl=pt-BR&gl=BR&mapclient=embed&q=Campos+do+Jord%C3%A3o+SP+12460-000 "Campos do Jordão")<br>Acesse o Website [aqui](https://pousada-tao.onrender.com/ "aqui") <br><br>
## Funcionalidades

- Reservas online com pagamento direto pelo site via <a href='https://www.nerdwallet.com/article/small-business/what-is-stripe' style='cursor: help;' target='_blank'>Stripe</a>.
- Confirmação automática após reserva por E-mail e SMS.
- Autenticação de usuário utilizando JWT & Cookies.
- Mecanismo de login após reserva.
- Gerenciamento eficiente das reservas utilizando MongoDB como banco de dados.
- Interface responsiva e intuitiva desenvolvida com HTML, CSS e JavaScript puro.
<br>
## Stack
- **Frontend:** HTML, CSS, JavaScript (puro)
- **Backend:** Node.js, Express.js
- **Banco de Dados:** MongoDB com Mongoose (<a href='https://www.mongodb.com/resources/products/platform/mongodb-atlas-tutorial' style='cursor: help;' target='_blank'>MongoDB Atlas</a>)
- **Deploy:** Docker hopedado no <a href='https://render.com/about' style='cursor: help;'>Render</a>
- **Pagamentos:** <a href='https://www.nerdwallet.com/article/small-business/what-is-stripe' style='cursor: help;' target='_blank'>Stripe</a>
- <details class='stack-details'>
    <summary><strong>Mensagens&nbsp;</strong></summary>
    <ul style='cursor: text; list-style-type: "•";'>
        <li>&nbsp;<strong>Email:</strong> Nodemailer</li>
        <li>&nbsp;<strong>SMS:</strong> Twilio (desativado por enquanto 😢)</li>
    </ul></details>
- <details class='stack-details'>
    <summary><strong>API's&nbsp;</strong></summary>
    <ul style='cursor: text; list-style-type: "•";'>
        <li>&nbsp;<strong>Stripe</strong></li>
        <li>&nbsp;<strong>Auth0 com MongoDB</strong> (desativado pois não é mais necessário 
        <a href='https://github.com/AdrianoLMRS/Website/commit/961443c099e786a387a5444cd0e4d5208955daaf' target='_blank'>Commit</a>, 
        <a href='https://github.com/AdrianoLMRS/Website/issues/6' target='_blank'>Issue</a> )</li>
    </ul></details><br>

## Demo
Acesse a aplicação em produção:
[🔗 Pousada TAO - Campos do Jordão](https://pousada-tao.onrender.com/)
<br>

## Contato

- **✉ Email:** adriano.limarossi@gmail.com
- **🕻 Telefone:** +55 12 99732-1039
- **<img width="14" height="14"  src="https://img.icons8.com/fluency-systems-filled/50/whatsapp.png" alt="whatsapp-icon"/> WhatsApp:** [Clique aqui para conversar](https://wa.me/5512997321039)
- **<img width="14" height="14" src="https://img.icons8.com/material-outlined/14/github.png" alt="github-icon"/> Github:** [AdrianoLMRS](https://github.com/AdrianoLMRS)

## Licença
WIP