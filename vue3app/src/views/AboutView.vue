<template>
  <div class="about">
    <h1>Entregas</h1>
    <p><label for="descricao">Descrição: </label><input id="descricao" type="text" v-model="entrega.descricao"/></p>
    <p><label for="dataHoraLimite">Data/hora limite: </label><input id="dataHoraLimite" type="datetime-local" v-model="entrega.dataHoraLimite"/></p>
    <p><label for="peso">Peso: </label><input id="peso" type="number" v-model="entrega.peso"/></p>
    <p><label for="observacoes">Observações: </label><input id="observacoes" type="text" v-model="entrega.observacoes"/></p>
    <button @click="incluir">Incluir</button>
    <button @click="atualizar" v-if="entrega.id">Atualizar</button>
    <button @click="cancelarEdicao" v-if="entrega.id">Cancelar</button>
    <p>{{ erro }}</p>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Descrição</th>
          <th>Data/hora limite</th>
          <th>Peso</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entregaItem in entregas" :key="entregaItem.id">
          <td>{{ entregaItem.id }}</td>
          <td>{{ entregaItem.descricao }}</td>
          <td>{{ entregaItem.dataHoraLimite }}</td>
          <td>{{ entregaItem.peso }}</td>
          <td>
            <button @click="selecionarEntrega(entregaItem)">Editar</button>
            <button @click="excluir(entregaItem.id)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import axios from 'axios';
  
  const entrega = ref({
    id: null,
    descricao: '',
    dataHoraLimite: '',
    peso: 1,
    observacoes: ''
  });
  const entregas = ref([]);
  const erro = ref("");

  async function incluir() {
    erro.value = "";
    try {
      await axios.post("entrega", entrega.value);
      limparFormulario();
    } catch(e) {
      erro.value = (e as Error).message;
    }
    buscarEntregas();
  }

  async function atualizar() {
    erro.value = "";
    try {
      await axios.put("entrega", entrega.value);
      limparFormulario();
    } catch(e) {
      erro.value = (e as Error).message;
    }
    buscarEntregas();
  }

  async function excluir(id: number) {
    erro.value = "";
    try {
      await axios.delete(`entrega/${id}`);
    } catch(e) {
      erro.value = (e as Error).message;
    }
    buscarEntregas();
  }

  function selecionarEntrega(entregaSelecionada: any) {
    entrega.value = { ...entregaSelecionada };
  }

  function limparFormulario() {
    entrega.value = {
      id: null,
      descricao: '',
      dataHoraLimite: '',
      peso: 1,
      observacoes: ''
    };
  }

  function cancelarEdicao() {
    limparFormulario();
  }

  async function buscarEntregas() {
    entregas.value = (await axios.get("entrega")).data;
  }

  onMounted(() => {
    buscarEntregas();
  });
</script>
