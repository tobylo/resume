// Open state for the job fit dialog, shared by every button that opens it.
// The dialog itself is rendered once, in the root layout.

function createJobFitDialog() {
	let open = $state(false);

	return {
		get open() {
			return open;
		},
		show() {
			open = true;
		},
		close() {
			open = false;
		}
	};
}

export const jobFit = createJobFitDialog();
