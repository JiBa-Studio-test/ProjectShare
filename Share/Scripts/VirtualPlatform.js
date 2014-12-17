
function OnTriggerEnter2D (jumper: Collider2D) {
    var platform = transform.parent;
    Physics2D.IgnoreCollision(jumper.GetComponent(BoxCollider2D), platform.GetComponent(BoxCollider2D));
}
 
function OnTriggerExit2D (jumper: Collider2D) {
    var platform = transform.parent;
    Physics2D.IgnoreCollision(jumper.GetComponent(BoxCollider2D), platform.GetComponent(BoxCollider2D), false);
}