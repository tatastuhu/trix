export default ({ TEST_IMAGE_URL }) => `
<trix-editor input="my_input" autofocus placeholder="Say hello..."></trix-editor>
<input id="my_input" type="hidden" value="ab&lt;img src=&quot;${TEST_IMAGE_URL}&quot; width=&quot;10&quot; height=&quot;10&quot;&gt;">`
