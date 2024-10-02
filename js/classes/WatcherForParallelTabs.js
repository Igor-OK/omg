export class WatcherForParallelTabs {
    constructor () {
        this.channel = new BroadcastChannel('tab-activity');
        this.channel.postMessage('open-new-tab');
        const lastSavedTab = localStorage.getItem('lastSavedTabNumber');
        this.tabNumber = lastSavedTab ? parseInt(lastSavedTab) + 1 : 0;
        localStorage.setItem('lastSavedTabNumber', this.tabNumber);

        this.$warning = document.getElementById('warning');
        this.$warningButton = document.getElementById('refreshButton');

        this.addEventListeners();
    }

    addEventListeners = () => {
        this.channel.addEventListener('message', (event) => {
            if (event.data === 'open-new-tab') {
                const lastSavedTabNumber = localStorage.getItem('lastSavedTabNumber');
                if (lastSavedTabNumber && parseInt(lastSavedTabNumber) >= this.tabNumber) this.showWarning();
            }
        });
        this.$warningButton.addEventListener('click', this.refresh);
    }

    showWarning () {
        this.$warning.classList.remove('hidden');
    }

    refresh () {
        window.location.reload();
    }
};
