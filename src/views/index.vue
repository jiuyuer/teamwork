<template>
    <div id="project-body">
        <Subnavbar></Subnavbar>
        <Tasklist></Tasklist>
    </div>
</template>

<script>
    import Subnavbar from '@/views/subNav'
    import Tasklist from '@/views/taskList'

    export default {
        name: 'project-view',
        components: { 
            'Subnavbar': Subnavbar,
            'Tasklist': Tasklist
        }
    }
</script>