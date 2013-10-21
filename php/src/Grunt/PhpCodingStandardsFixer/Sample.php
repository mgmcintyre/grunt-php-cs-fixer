<?php

namespace Grunt\PhpCodingStandardsFixer;

class Sample
{

    /**
     * @var string
     */
    protected $_string = '';

    /**
     * Constructor
     *
     * @param string $string
     */
    public function __construct($string)
    {
        $this->setString($string);
    }

    /**
     * Setter for string
     *
     * @param  string $string
     * @return self
     */
    public function setString($string)
    {
        $this->_string = $string;

        return $this;
    }

    /**
     * Getter for string
     *
     * @return string
     */
    public function getString()
    {
        return $this->_string;
    }

}
