<script lang="ts">
	import Chart, { type ChartTypeRegistry } from 'chart.js/auto';
	import { onMount } from 'svelte';

	export let id: string,
		type: keyof ChartTypeRegistry,
		options = {
			responsive: true,
			maintainAspectRatio: false
		},
		data = {
			labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'A', 'B', 'C'],
			datasets: [
				{
					label: id,
					data: [2, 5, 3, 5, 2, 3, 7, 8, 9],
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(153, 102, 255, 0.2)',
						'rgba(255, 159, 64, 0.2)'
					],
					borderColor: [
						'rgba(255, 99, 132, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(153, 102, 255, 1)',
						'rgba(255, 159, 64, 1)'
					],
					borderWidth: 3,
					tension: 0
				}
			]
		};

	onMount(() => {
		var ctx = (document.getElementById(id) as HTMLCanvasElement)?.getContext(
			'2d'
		) as CanvasRenderingContext2D;

		var myChart = new Chart(ctx, {
			type: type,
			options: options,
			data: data
		});
	});
</script>

<div id="{id}-Parent">
	<canvas {id} />
</div>

<style>
	canvas {
		width: 100%;
		height: 100%;
	}
</style>
