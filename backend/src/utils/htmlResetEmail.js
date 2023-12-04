const generateHtmlContent = (token) => 
`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Redefinição de Senha</title>
  <style>
    body {
      font-family: "Arial", sans-serif;
      background-color: #f4f4f4;
      color: #333;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    .container {
      width: 80%;
      max-width: 400px;
      background-color: #fff;
      padding: 20px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      text-align: center;
    }

    h1 {
      color: #4CAF50;
    }

    p {
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 20px;
    }

    strong {
      font-weight: bold;
      font-size: 24px;
      color: #333;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Redefinição de Senha</h1>
    <p>Você está recebendo este e-mail porque solicitou a redefinição de sua senha.</p>
    <p>Use o seguinte token para completar o processo de redefinição de senha:</p>
    <strong>${token}</strong>
    <p>Se você não solicitou a redefinição da senha, ignore este e-mail.</p>
  </div>
</body>
</html>
`

module.exports = generateHtmlContent