function calcularDoppler() {
    // 1. Captura os valores dos inputs
    const f0 = parseFloat(document.getElementById('frequenciaFonte').value);
    const v = parseFloat(document.getElementById('velocidadeSom').value);
    const vo = parseFloat(document.getElementById('velocidadeObservador').value);
    const vf = parseFloat(document.getElementById('velocidadeFonte').value);

    const sentidoObservador = document.getElementById('sentidoObservador').value;
    const sentidoFonte = document.getElementById('sentidoFonte').value;

    // 2. Validação básica de preenchimento
    if (isNaN(f0) || isNaN(v) || isNaN(vo) || isNaN(vf)) {
        alert("Por favor, preencha todos os campos com valores válidos.");
        return;
    }

    // 3. Regra de sinais do Efeito Doppler baseado no sentido convencional:
    // Numerador (Observador): + se aproxima, - se afasta
    // Denominador (Fonte): - se aproxima, + se afasta
    let sinalObservador = (sentidoObservador === 'aproxima') ? 1 : -1;
    let sinalFonte = (sentidoFonte === 'aproxima') ? -1 : 1;

    // Evita divisão por zero se a fonte se afastar/aproximar na velocidade do som de forma inválida
    if ((v + (sinalFonte * vf)) === 0) {
        alert("Erro: Divisão por zero. A velocidade da fonte e do som geram uma singularidade.");
        return;
    }

    // 4. Aplicação da fórmula: f = f0 * ((v ± vo) / (v ∓ vf))
    const numerador = v + (sinalObservador * vo);
    const denominador = v + (sinalFonte * vf);
    const f = f0 * (numerador / denominador);

    // 5. Exibe o resultado na tela formatado com duas casas decimais
    const divResultado = document.getElementById('resultado');
    const spanFreq = document.getElementById('freqPercebida');
    
    spanFreq.innerText = f.toFixed(2);
    divResultado.classList.remove('hidden');
}
