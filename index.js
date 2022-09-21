const Pusher = require("pusher-js");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

(async () => {
  logInfo("Iniciando o serviço.");
  await downloadData();

  const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
    cluster: process.env.PUSHER_APP_CLUSTER,
  });

  const channel = pusher.subscribe(process.env.DOMINIO + "-integracao-ilab");
  logSuccess("Aguardando novos arquivos...");
  channel.bind("xml-gerado", function () {
    logInfo("Verificando arquivos no servidor.");
    downloadData();
  });
})();

async function downloadData() {
  logInfo("Conectando com o servidor...");
  const url =
    process.env.APP_BASEURL +
    "/integracao-ilab/" +
    process.env.DOMINIO +
    "/" +
    process.env.APP_KEY;

  try {
    await axios.get(url).then((res) => {
      //logError(res);
      if (res.status != 200 || !res.data) {
        logError(res);
        return;
      }

      if (res.data.status && res.data.status != 200) {
        logError(res.data.error);
        return;
      }

      if (res.data.items && res.data.items.length <= 0) {
        logSuccess("Nao existem arquivos novos para download.");
        return;
      }

      logInfo(
        "Salvando arquivos na pasta de destino: " + res.data.items.length
      );
      res.data.items.forEach((item) => {
        const key = item.key;
        const content = item.value;
        const ext = item.ext;

        salvarArquivo(nomeArquivo(key, ext), content);
      });

      //logInfo(res.data);
    });
  } catch (error) {
    logError(error);
  }
}

function salvarArquivo(nome, content) {
  arquivo = path.join(process.env.APP_PASTA_DESTINO, nome);

  fs.writeFile(arquivo, content, function (erro) {
    if (erro) {
      logError(erro);
    } else {
      logSuccess("Arquivo salvo com sucesso: " + nome);
    }
  });
}

function nomeArquivo(key, ext) {
  const arr = key.split("-");
  return "arquivo_" + arr[2] + "." + ext;
}

function logSuccess(message) {
  console.log("\x1b[33m", now(), ":\x1b[0m", "\x1b[32m", message, "\x1b[0m"); //cyan
}

function logError(message) {
  console.log("\x1b[33m", now(), ":\x1b[0m", "\x1b[31m", message, "\x1b[0m"); //cyan
}

function logInfo(message) {
  console.log("\x1b[33m", now(), ":\x1b[0m", "\x1b[36m", message, "\x1b[0m"); //cyan
}

function now() {
  var m = new Date();
  return m.toISOString().replace("T", " ").replace("Z", " ");
}
