!function(){"use strict";window.wp.data,window.document.addEventListener("DOMContentLoaded",(function(){new Promise((e=>{console.log(wp.data.select("core/editor").getEditedPostAttribute("meta"));const t=wp.data.subscribe((()=>{console.log(wp.data.select("core/editor")),wp.data.select("core/editor").isCleanNewPost()&&(t(),e()),wp.data.select("core/editor").getBlocks().length>0&&(t(),e()),console.log(wp.data.select("core/editor"))}))})).then((()=>{console.log("editor ready"),console.log(wp.data.select("core/editor").getEditedPostAttribute("meta"))}))}))}();