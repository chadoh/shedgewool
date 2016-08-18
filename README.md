Abstractions.io Schedule Explorer
=================================

Built with React using [create-react-app](https://github.com/facebookincubator/create-react-app).


Contributing
------------

* Clone the repo
* Run `npm i` (must have npm >= v4)
* Run `npm start`
* Hack!
* Send a pull request!


Deploying
---------

Deploying uses Ruby, because that's the process I know. 

* `gem install bundler`
* `bundle install`
* `rake aws:deploy`

You'll also need a `config.yml` file (gitignored) with some AWS keys in it.
