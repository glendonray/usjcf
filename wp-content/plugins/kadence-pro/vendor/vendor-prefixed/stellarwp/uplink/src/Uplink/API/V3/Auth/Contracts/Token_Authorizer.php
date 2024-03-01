<?php
/**
 * @license GPL-2.0-or-later
 *
 * Modified by kadencewp on 11-January-2024 using Strauss.
 * @see https://github.com/BrianHenryIE/strauss
 */ declare( strict_types=1 );

namespace KadenceWP\KadencePro\StellarWP\Uplink\API\V3\Auth\Contracts;

interface Token_Authorizer {

	/**
	 * Check if a license is authorized.
	 *
	 * @see is_authorized()
	 * @see \KadenceWP\KadencePro\StellarWP\Uplink\API\V3\Auth\Token_Authorizer
	 *
	 * @param  string  $license  The license key.
	 * @param  string  $token    The stored token.
	 * @param  string  $domain   The user's domain.
	 *
	 * @return bool
	 */
	public function is_authorized( string $license, string $token, string $domain ): bool;

}
