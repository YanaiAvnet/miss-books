export default {
    template: `
                <div class="double-slider no-select">
                    <div @click="setRangeClick" class="track no-select" @mousemove.prevent="">
                        <div class="highlight" :style="{height: '4px', width: highlightWidth, left: highlightLoc}"></div>
                        <div @selectstart.prevent="" @mousedown="startDrag(1, $event)" @mousemove.prevent="drag"
                        class="thumb1 thumb" :style="{ transform: 'translateX('+thumb1LocString+')'}">

                        </div>
                        <div @selectstart.prevent="" @mousedown="startDrag(2, $event)"
                        @mousemove.prevent="drag" class="thumb2 thumb" :style="{ transform: 'translateX('+thumb2LocString+')'}">

                        </div>
                    </div>
                </div>
    `,
    data() {
        return {
            thumb1Location: 0,
            thumb2Location: 150,
            MouseStartPos: null,
            dragThumb: null,
            dragStartPos: null
        }
    },
    methods: {
        startDrag(thumbNum, ev) {
            document.body.addEventListener('mousemove', this.drag);
            document.body.addEventListener('mouseup', this.stopDrag);
            this.dragThumb = thumbNum;
            this.MouseStartPos = ev.clientX;
            this.dragStartPos = thumbNum === 1 ? this.thumb1Location : this.thumb2Location;           
        },
        drag(ev) {
            ev.preventDefault();
            if (!this.dragThumb) return;
            let mouseDiff = ev.clientX - this.MouseStartPos;
            let newLoc = this.dragStartPos + mouseDiff;
            switch(this.dragThumb) {
                case 1:
                if (newLoc < 0) this.thumb1Location = 0;
                else if (newLoc > 150) this.thumb1Location = 150;
                else this.thumb1Location = newLoc;
                break;
                case 2:
                if (newLoc < 0) this.thumb2Location = 0;
                else if (newLoc > 150) this.thumb2Location = 150;
                else this.thumb2Location = newLoc;
                break;
            }
            this.$emit('range', this.thumb1Location, this.thumb2Location);
        },
        stopDrag() {
            document.body.removeEventListener('mousemove', this.drag);
            document.body.removeEventListener('mouseup', this.stopDrag);
            this.dragThumb = null;
        },
        setRangeClick() {

        }
    },
    computed: {
        thumb1LocString() {          
            return this.thumb1Location + 'px'
        },
        thumb2LocString() {
            return this.thumb2Location + 'px'
        },
        highlightWidth() {
            return Math.abs(this.thumb1Location - this.thumb2Location) + 1 + 'px'           
        },
        highlightLoc() {
            return this.thumb1Location < this.thumb2Location ? this.thumb1Location + 'px' : this.thumb2Location + 'px';
        }
    }

}