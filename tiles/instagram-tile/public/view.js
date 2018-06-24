jive.tile.onOpen((config, options) => {
  osapi.jive.corev3.people.getViewer().execute(function(viewer) {
    jive.tile.getPrivateProps(function(privateProps) {
      jive.tile.getContainer((container) => {
        container.getActivity().execute(function(response) {

          var app = new Vue({
            el: '#view',
            template: ``,
            data: {
              hashtag: config.hashtag,
              height: config.height
            },
            watch: {},
            methods: {},
            created: function() {
              var feed = new Instafeed({
                get: 'tagged',
                tagName: config.hashtag,
                clientId: '37c631f165b347a4a721e410e75e3338',
                accessToken: '262524786.37c631f.a46c7aa4014847c3b41fce00edb79943',
                resolution: 'low_resolution',
                filter: function(image) {

                  if (image.type == 'image') {
                    image.template = `<div class="insta-photo">
                       <div class="window">
                          <div class="content">
                             <div class="post">
                                <div class="name">
                                   <img  src="{{model.user.profile_picture}}" width="10%" height="10%" class="profile-img"/>
                                   <p style="margin-left: 5px;">{{model.user.full_name}}</p>
                                </div>
                             </div>
                             <div class="post-image" style="margin-bottom: 10px;">
                               <a target="_blank" href="{{link}}">
                                 <img src="{{image}}" width="100%" />
                               </a>
                             </div>
                             <div class="like-count">
                                <img style="margin-right: 5px;" src="https://image.flaticon.com/icons/svg/60/60993.svg" width="4%"/>
                                <p>{{likes}} likes</p>
                             </div>
                             <div class="like-count">
                               <img style="margin-right: 5px;" src="https://image.flaticon.com/icons/svg/12/12412.svg" width="4%"/>
                               <p>{{comments}} comments</p>
                             </div>
                             <div class="like-count">
                                <p>{{caption}}</p>
                             </div>
                          </div>
                       </div>
                    </div>`
                  } else {
                    image.template = `<div class="insta-photo">
                       <div class="window">
                          <div class="content">
                             <div class="post">
                                <div class="name">
                                   <img  src="{{model.user.profile_picture}}" width="10%" height="10%" class="profile-img"/>
                                   <p style="margin-left: 5px;">{{model.user.full_name}}</p>
                                     <span style="position: absolute; right: -5px; top: 3px;" class="faq-play" onclick="playVideo(event)" ></span>
                                </div>
                             </div>
                             <div class="post-image" style="margin-bottom: 10px;">
                             <a target="_blank" href="{{link}}">
                               <video class="insta-video" src="{{model.videos.low_bandwidth.url}}" width="100%" loop muted ></video>
                             </a>
                             </div>
                             <div class="like-count">
                                <img style="margin-right: 5px;" src="https://image.flaticon.com/icons/svg/60/60993.svg" width="4%"/>
                                <p>{{likes}} likes</p>
                             </div>
                             <div class="like-count">
                               <img style="margin-right: 5px;" src="https://image.flaticon.com/icons/svg/12/12412.svg" width="4%"/>
                               <p>{{comments}} comments</p>
                             </div>
                             <div class="like-count">
                                <p>{{caption}}</p>
                             </div>
                          </div>
                       </div>
                    </div>`
                  }
                  return true
                },
                template: '{{model.template}}'
              })
              feed.run()

              // last minutes shit code =p
              function playVideo(event) {
                let jThis = $(event.currentTarget)
                if (jThis.hasClass('faq-play')) {
                  jThis.parent().parent().parent().find('.insta-video')[0].play()
                  jThis.removeClass('faq-play').addClass('faq-pause')
                } else if (jThis.hasClass('faq-pause')) {
                  jThis.parent().parent().parent().find('.insta-video')[0].pause()
                  jThis.removeClass('faq-pause').addClass('faq-play')
                }
              }

              console.log(config.hashtag)
            }
          })

          gadgets.window.adjustHeight(config.height)
          document.getElementById('instafeed').style.height = config.height
          console.log(response)

        })

      })
    })
  })

})
