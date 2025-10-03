<script lang="ts">
  import './switch.css'

  interface PropsSwitch {
    id: string,
    titulo?: string,
    subtitulo?: string,
    checked?: boolean
  }
  let { id, titulo='', subtitulo='', checked=$bindable(false) }: PropsSwitch = $props()
</script>

<label class="switch switch-separacion" for="{id}">
    <span class="contenedor-texto">
        <span class="titulo-label"><b>{titulo}</b></span>
        <span class="subtitulo-label">{subtitulo}</span>
    </span>
    <input type="checkbox" id={id} bind:checked={checked}/>
    <span class="slider"></span>
</label>